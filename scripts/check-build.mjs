/**
 * Verifies what `scripts/prerender.mjs` produced.
 *
 * The prerenderer's failure mode isn't crashing — it's writing files that look
 * fine and are subtly wrong: a regex that stopped matching after an index.html
 * edit leaves every page sharing one <title>, a route silently missing means a
 * deep link 404s, a draft route leaking into the sitemap contradicts its own
 * noindex tag. None of that shows up in a build log, and all of it is cheap to
 * assert. CI runs this before uploading the artifact.
 *
 * No dependencies on purpose: this has to be able to catch a broken build, so
 * it shouldn't share machinery with the thing it's checking.
 */
import { readFile, access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const problems = []
const fail = (message) => problems.push(message)

const exists = async (p) => {
  try {
    await access(p)
    return true
  } catch {
    return false
  }
}

const read = (p) => readFile(path.join(dist, p), 'utf8')

const { routes } = await import(path.join(root, 'dist-ssr/entry-server.js'))

// --- Every route produced a file, with its own metadata ---------------------
const titles = new Map()
const canonicals = new Map()
const canonicalByPath = new Map()

for (const route of routes) {
  const file = route.path === '/' ? 'index.html' : `${route.path.slice(1)}/index.html`
  if (!(await exists(path.join(dist, file)))) {
    fail(`${route.path}: no HTML emitted (expected dist/${file})`)
    continue
  }

  const html = await read(file)

  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1]
  if (!title) fail(`${route.path}: no <title>`)
  else if (titles.has(title)) fail(`${route.path}: shares its <title> with ${titles.get(title)}`)
  else titles.set(title, route.path)

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  if (!canonical) fail(`${route.path}: no canonical link`)
  else if (canonicals.has(canonical))
    fail(`${route.path}: shares its canonical with ${canonicals.get(canonical)}`)
  else canonicals.set(canonical, route.path)
  if (canonical) canonicalByPath.set(route.path, canonical)

  const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1]
  if (ogUrl !== canonical) fail(`${route.path}: og:url (${ogUrl}) != canonical (${canonical})`)

  // og:image must be absolute and share an origin with the canonical, or link
  // unfurls point at a host that isn't serving the site.
  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1]
  if (!ogImage) fail(`${route.path}: no og:image`)
  else if (canonical && new URL(ogImage).origin !== new URL(canonical).origin)
    fail(`${route.path}: og:image origin (${ogImage}) doesn't match canonical (${canonical})`)

  const isNoindex = /<meta name="robots" content="noindex/.test(html)
  if (Boolean(route.draft) !== isNoindex)
    fail(
      `${route.path}: draft=${Boolean(route.draft)} but noindex=${isNoindex} — these must agree`,
    )

  // JSON-LD has to be parseable; a malformed node is silently ignored by
  // crawlers, which is the same as not having shipped it.
  for (const [, json] of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )) {
    try {
      const parsed = JSON.parse(json)
      if (!parsed['@context'] || !parsed['@type'])
        fail(`${route.path}: JSON-LD node missing @context/@type`)
    } catch (error) {
      fail(`${route.path}: unparseable JSON-LD (${error.message})`)
    }
  }

  // Rendered markup shouldn't contain stringified nullish values — those mean a
  // template interpolated something undefined.
  const body = html.match(/<div id="root">([\s\S]*)<\/div>/)?.[1] ?? ''
  for (const token of ['undefined', 'NaN', '[object Object]']) {
    if (body.includes(token)) fail(`${route.path}: rendered markup contains "${token}"`)
  }
}

// --- Sitemap ---------------------------------------------------------------
if (!(await exists(path.join(dist, 'sitemap.xml')))) {
  fail('no sitemap.xml')
} else {
  const sitemap = await read('sitemap.xml')
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

  if (!locs.length) fail('sitemap.xml has no <loc> entries')

  const dupes = locs.filter((loc, i) => locs.indexOf(loc) !== i)
  if (dupes.length) fail(`sitemap.xml has duplicate entries: ${[...new Set(dupes)].join(', ')}`)

  // Matched against each page's own canonical rather than against route.path:
  // on a project Pages deploy every URL carries a /<repo>/ prefix, so comparing
  // bare paths would report the whole sitemap missing. Going through the
  // canonical also proves the two agree, which is the thing crawlers care about.
  const seen = new Set(locs.map((loc) => loc.replace(/\/$/, '')))
  for (const route of routes) {
    const canonical = canonicalByPath.get(route.path)
    if (!canonical) continue // already reported above
    const listed = seen.has(canonical.replace(/\/$/, ''))
    if (route.draft && listed) fail(`sitemap.xml lists draft route ${route.path}`)
    if (!route.draft && !listed) fail(`sitemap.xml is missing ${route.path} (${canonical})`)
  }

  for (const loc of locs) {
    try {
      new URL(loc)
    } catch {
      fail(`sitemap.xml has a non-absolute <loc>: ${loc}`)
    }
  }
}

// --- The rest of the static output -----------------------------------------
for (const file of ['404.html', 'robots.txt', '.nojekyll']) {
  if (!(await exists(path.join(dist, file)))) fail(`no ${file}`)
}

// 404.html has to stay the unrendered shell — React Router reads the URL on
// load and renders the real route. A prerendered page here would show the
// wrong content on every deep-link miss.
if (await exists(path.join(dist, '404.html'))) {
  const notFound = await read('404.html')
  if (!notFound.includes('<div id="root"></div>'))
    fail('404.html is not the unrendered shell — deep-link fallbacks will render the wrong page')
}

// ---------------------------------------------------------------------------
if (problems.length) {
  console.error(`check-build: ${problems.length} problem(s):\n  ${problems.join('\n  ')}`)
  process.exit(1)
}

console.log(`check-build: ${routes.length} routes OK`)
