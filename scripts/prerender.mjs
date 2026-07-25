/**
 * Turns the single-page build into one real HTML file per route.
 *
 * Runs after `vite build` (which writes dist/) and `vite build --ssr` (which
 * writes dist-ssr/entry-server.js). For every route it renders the app in Node,
 * drops the markup into the built shell, rewrites the head tags for that page,
 * and writes dist/<path>/index.html. Then emits sitemap.xml and robots.txt.
 *
 * Why it exists: GitHub Pages serves one index.html for everything, so before
 * this every URL shared the same <title>, description and og: tags, and the blog
 * — fetched in the browser — was invisible to crawlers entirely.
 *
 * Failure policy: a route that throws is reported and skipped, and the script
 * exits non-zero at the end, but the other routes still get written. A blog API
 * outage degrades to "no blog pages prerendered" rather than a failed deploy.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { parseHTML } from 'linkedom'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

/**
 * Where the built site actually answers, used for absolute canonical / og:url /
 * sitemap entries. Includes the subpath on project Pages, so route paths append
 * to it directly. The workflow sets it; the default is the cutover domain.
 */
const SITE_URL = (process.env.SITE_URL || 'https://www.carbonlesscommunity.com').replace(/\/$/, '')

// ---------------------------------------------------------------------------
// The app's HTML sanitizer runs on DOMParser, which Node doesn't have. Install
// a linkedom-backed one before importing anything that reaches for it.
//
// Not linkedom's own DOMParser export: given a bare fragment it parses the
// markup as-is instead of synthesising the html/head/body wrappers a browser
// creates, so `documentElement` comes back as the fragment's first tag and
// `body.innerHTML` is empty — which silently stripped every post body. Wrapping
// the input restores the shape the sanitizer expects.
// ---------------------------------------------------------------------------
const { document: sharedDocument } = parseHTML('<!doctype html><html><body></body></html>')
globalThis.DOMParser = class {
  parseFromString(html) {
    return parseHTML(`<!doctype html><html><body>${html}</body></html>`).document
  }
}
globalThis.document = sharedDocument

const { render, routes, fetchPosts } = await import(path.join(root, 'dist-ssr/entry-server.js'))

const shell = await readFile(path.join(dist, 'index.html'), 'utf8')

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Rewrites the per-page tags in the built shell and injects the rendered markup.
 * Everything else in <head> — stylesheet links, the theme script, fonts — is
 * left exactly as Vite emitted it.
 */
function buildPage({ path: routePath, title, description, markup }) {
  // The home page keeps the marketing title from index.html; every other page
  // gets the same "<page> — Carbonless Community" shape `usePageMeta` produces.
  const fullTitle =
    routePath === '/'
      ? 'Carbonless Community — Reduce your carbon footprint, together'
      : `${title} — Carbonless Community`
  const canonical = `${SITE_URL}${routePath === '/' ? '/' : routePath}`

  return shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(fullTitle)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escapeAttr(description)}" />`,
    )
    .replace(
      /<meta\s+property="og:title"[^>]*\/>/,
      `<meta property="og:title" content="${escapeAttr(fullTitle)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${escapeAttr(description)}" />`,
    )
    .replace(
      '</head>',
      `  <link rel="canonical" href="${escapeAttr(canonical)}" />\n` +
        `    <meta property="og:url" content="${escapeAttr(canonical)}" />\n  </head>`,
    )
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
}

async function writePage(routePath, html) {
  // '/' becomes dist/index.html; '/about' becomes dist/about/index.html, which
  // Pages serves for both /about and /about/.
  const dir = routePath === '/' ? dist : path.join(dist, routePath)
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, 'index.html'), html)
}

const failures = []

// --- Static routes ---------------------------------------------------------
for (const route of routes) {
  try {
    const markup = render(`${route.path}`)
    await writePage(route.path, buildPage({ ...route, markup }))
  } catch (error) {
    failures.push(`${route.path}: ${error.message}`)
  }
}
console.log(`prerender: ${routes.length - failures.length}/${routes.length} static routes`)

// --- Blog ------------------------------------------------------------------
// Its content lives on WordPress and is fetched at runtime, so without this the
// site's best long-form content never reaches a crawler.
let posts = []
try {
  posts = await fetchPosts()
} catch (error) {
  console.warn(`prerender: blog API unavailable (${error.message}) — skipping blog pages`)
}

const blogRoutes = []
if (posts.length) {
  try {
    const markup = render('/blog', { posts })
    await writePage('/blog', buildPage({
      path: '/blog',
      title: 'Blog',
      description: 'Information on all sides of the energy and environment discussions.',
      markup,
    }))
  } catch (error) {
    failures.push(`/blog: ${error.message}`)
  }

  for (const post of posts) {
    const routePath = `/blog/${post.slug}`
    try {
      const markup = render(routePath, { post })
      await writePage(routePath, buildPage({
        path: routePath,
        title: post.title,
        description: post.excerpt?.slice(0, 200) || 'A post from the Carbonless Community blog.',
        markup,
      }))
      blogRoutes.push({ path: routePath, priority: 0.6, lastmod: post.date })
    } catch (error) {
      failures.push(`${routePath}: ${error.message}`)
    }
  }
  console.log(`prerender: ${blogRoutes.length}/${posts.length} blog posts`)
}

// --- 404 -------------------------------------------------------------------
// Pages has no rewrite rules, so a deep link that misses a prerendered file
// falls back to this. It has to stay the unrendered shell: React Router reads
// the URL on load and renders whatever the path actually is.
await writeFile(path.join(dist, '404.html'), shell)

// --- sitemap.xml -----------------------------------------------------------
const sitemapEntries = [
  ...routes.map((r) => ({ path: r.path, priority: r.priority ?? 0.7 })),
  ...blogRoutes,
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    (e) =>
      `  <url>\n    <loc>${SITE_URL}${e.path === '/' ? '/' : e.path}</loc>\n` +
      (e.lastmod ? `    <lastmod>${new Date(e.lastmod).toISOString().slice(0, 10)}</lastmod>\n` : '') +
      `    <priority>${e.priority.toFixed(1)}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`
await writeFile(path.join(dist, 'sitemap.xml'), sitemap)

// --- robots.txt ------------------------------------------------------------
// Crawlers only read robots.txt at an origin root, so this does nothing while
// the site is served from the /<repo>/ subpath — it starts working at cutover.
await writeFile(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
)

console.log(`prerender: sitemap.xml (${sitemapEntries.length} urls), robots.txt`)

if (failures.length) {
  console.error(`prerender: ${failures.length} route(s) failed:\n  ${failures.join('\n  ')}`)
  process.exit(1)
}
