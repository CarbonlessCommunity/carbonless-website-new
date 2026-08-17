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
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
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

/** Social preview image, absolute against wherever the site actually answers. */
const ogImage = `${SITE_URL}/images/og-image.jpg`

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

const {
  render,
  routes,
  fetchPosts,
  organizationSchema,
  websiteSchema,
  blogPostingSchema,
  breadcrumbSchema,
} = await import(path.join(root, 'dist-ssr/entry-server.js'))

/**
 * Preloads the self-hosted body and display faces.
 *
 * Fonts are imported from src/index.css, so the browser can't discover them
 * until it has fetched and parsed the stylesheet — two serialised round trips
 * before any text renders in the real typeface. A preload starts the font
 * fetch in parallel with the CSS instead.
 *
 * Latin only, deliberately: @fontsource ships a file per unicode subset and the
 * site's copy is English, so preloading cyrillic/greek/vietnamese would spend
 * bandwidth on bytes no visitor renders. Vite hashes the filenames, hence the
 * directory scan rather than a hardcoded list.
 */
async function fontPreloads() {
  const base = (process.env.PAGES_BASE || '/').replace(/\/$/, '')
  let files = []
  try {
    files = await readdir(path.join(dist, 'assets'))
  } catch {
    return ''
  }
  const latin = files.filter((f) => /-latin-wght-normal-[^.]*\.woff2$/.test(f))
  if (!latin.length) console.warn('prerender: no latin woff2 found in dist/assets — fonts not preloaded')
  return latin
    .map(
      (f) =>
        `    <link rel="preload" as="font" type="font/woff2" crossorigin href="${base}/assets/${f}" />\n`,
    )
    .join('')
}

const shell = (await readFile(path.join(dist, 'index.html'), 'utf8')).replace(
  '</head>',
  `${await fontPreloads()}  </head>`,
)

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Serializes a value for embedding in a <script> tag — both the JSON-LD nodes
 * and the blog payload handed to the client.
 *
 * Deliberately NOT escapeAttr: inside a script element the parser is looking for
 * the literal `</script`, so `<` and `&` are the characters that matter and HTML
 * attribute escaping would corrupt the JSON. Escaping `<` as < keeps the
 * value valid JSON while making the closing-tag sequence unrepresentable.
 */
const jsonLd = (node) => JSON.stringify(node).replace(/</g, '\\u003c')

/** Route title lookup for breadcrumb trails, built once. */
const titleByPath = new Map(routes.map((r) => [r.path, r.title]))

/**
 * Rewrites the per-page tags in the built shell and injects the rendered markup.
 * Everything else in <head> — stylesheet links, the theme script, fonts — is
 * left exactly as Vite emitted it.
 */
function buildPage({
  path: routePath,
  title,
  description,
  markup,
  draft = false,
  schemas = [],
  image = ogImage,
  prerenderData = null,
}) {
  // The home page keeps the marketing title from index.html; every other page
  // gets the same "<page> — Carbonless Community" shape `usePageMeta` produces.
  const fullTitle =
    routePath === '/'
      ? 'Carbonless Community — Carbon offsets that have to prove something'
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
    // index.html hardcodes the cutover domain so the tag is absolute even in a
    // raw `vite build`. Restamp it from SITE_URL, or every link shared while the
    // site is on the /<repo>/ subpath points its preview image at a host that
    // isn't serving the site.
    .replace(
      /<meta\s+property="og:image"[^>]*\/>/,
      `<meta property="og:image" content="${escapeAttr(image)}" />`,
    )
    // The shell declares the share card's 1200x630, which is right for the
    // default image and wrong for a post's own. Drop the dimensions when the
    // image isn't that file — every consumer falls back to reading the real
    // ones, where a stated size that doesn't match crops the preview.
    .replace(
      /\s*<meta property="og:image:width"[^>]*\/>\s*<meta property="og:image:height"[^>]*\/>/,
      image === ogImage
        ? '\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />'
        : '',
    )
    .replace(
      '</head>',
      `  <link rel="canonical" href="${escapeAttr(canonical)}" />\n` +
        `    <meta property="og:url" content="${escapeAttr(canonical)}" />\n` +
        `    <meta name="twitter:image" content="${escapeAttr(image)}" />\n` +
        (draft ? `    <meta name="robots" content="noindex, follow" />\n` : '') +
        schemas
          .filter(Boolean)
          .map((s) => `    <script type="application/ld+json">${jsonLd(s)}</script>\n`)
          .join('') +
        `  </head>`,
    )
    .replace(
      '<div id="root"></div>',
      `<div id="root">${markup}</div>` +
        // Seeds lib/prerenderData.ts in the browser. The client mounts with
        // createRoot, so React re-renders from state and ignores the markup
        // above — without this the blog replaced a rendered post with a
        // skeleton on every load, then fetched back what it had just thrown
        // away. An inline classic script runs at parse time, well before the
        // deferred module bundle reads it.
        (prerenderData
          ? `\n    <script>window.__PRERENDER__=${jsonLd(prerenderData)}</script>`
          : ''),
    )
}

async function writePage(routePath, html) {
  // '/' becomes dist/index.html; '/about' becomes dist/about/index.html, which
  // Pages serves for both /about and /about/.
  const dir = routePath === '/' ? dist : path.join(dist, routePath)
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, 'index.html'), html)
}

const failures = []

// The entity nodes are identical on every page — build them once. Google reads a
// repeated, consistent Organization across a site as its definition.
const orgSchema = organizationSchema(SITE_URL)
const siteSchema = websiteSchema(SITE_URL)

// --- Static routes ---------------------------------------------------------
for (const route of routes) {
  try {
    const markup = render(`${route.path}`)
    const schemas = [
      orgSchema,
      // WebSite belongs on the home page only; repeating it site-wide adds
      // nothing and muddies which URL is the search target.
      route.path === '/' ? siteSchema : null,
      breadcrumbSchema(SITE_URL, route.path, (p) => titleByPath.get(p)),
    ]
    await writePage(route.path, buildPage({ ...route, markup, schemas }))
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
      schemas: [orgSchema],
      prerenderData: { posts },
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
        // A post's own featured image is what makes a shared link worth
        // clicking; the generic card says nothing about the post. Falls back to
        // that card for the posts that have no featured image.
        image: post.image || ogImage,
        prerenderData: { post },
        schemas: [
          orgSchema,
          blogPostingSchema(SITE_URL, post),
          breadcrumbSchema(SITE_URL, routePath, (p) =>
            p === '/blog' ? 'Blog' : titleByPath.get(p) ?? post.title,
          ),
        ],
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
// Draft routes are written and linked, but stay out of the index — they carry a
// `noindex` tag from buildPage, and listing them here would contradict it.
const sitemapEntries = [
  ...routes.filter((r) => !r.draft).map((r) => ({ path: r.path, priority: r.priority ?? 0.7 })),
  ...blogRoutes,
]

const draftCount = routes.filter((r) => r.draft).length
if (draftCount) console.log(`prerender: ${draftCount} draft route(s) excluded from sitemap`)

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
