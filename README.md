# Carbonless Community

A rebuild of [carbonlesscommunity.com](https://www.carbonlesscommunity.com/), replacing the
original jQuery + Bootstrap 4 static site with a React single-page app.

All copy, photography and partner logos are carried over from the original site. The blog is
no longer an outbound link — posts are pulled from the WordPress REST API and rendered in-site.

## Stack

| | |
| --- | --- |
| Build | Vite 8 |
| UI | React 19, TypeScript |
| Routing | React Router 7 (`BrowserRouter`) |
| Styling | Tailwind CSS 4 (CSS-first config, no `tailwind.config.js`) |
| Lint | oxlint |

## Getting started

```bash
npm install
npm run dev
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:5173 |
| `npm run build` | Typecheck, bundle to `dist/`, build the SSR entry, then prerender every route (see below) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | oxlint |
| `npm test` | Vitest — covers the blog HTML sanitizer |

### What `npm run build` actually does

Four steps, in order:

1. `tsc -b` — typecheck (strict, with `noUncheckedIndexedAccess`).
2. `vite build` — the client bundle into `dist/`.
3. `vite build --ssr src/entry-server.tsx` — a Node-renderable copy into `dist-ssr/`.
4. `node scripts/prerender.mjs` — renders each route in Node and writes a real
   `dist/<path>/index.html` with that page's `<title>`, description, canonical,
   `og:*` tags and JSON-LD, then emits `404.html`, `sitemap.xml` and `robots.txt`.

`node scripts/check-build.mjs` verifies the output afterwards; CI runs it before
uploading the artifact.

### Environment variables

All optional — each feature degrades rather than breaking when its variable is unset.
In CI they come from repo secrets of the same name (see `.github/workflows/deploy.yml`).

| Variable | Unset behaviour |
| --- | --- |
| `VITE_FORMSPREE_ID` | Contact form hands off to `mailto:` instead of posting |
| `VITE_FORMSPREE_NEWSLETTER_ID` | Subscribe form hands off to `mailto:` |
| `VITE_PLAUSIBLE_DOMAIN` | Analytics script is never injected |

## Layout

```
src/
  data/          Ported site content as typed records — edit here, not in JSX
    site.ts        Org details, contacts, impact stats, testimonials, nav tree
    people.ts      Team and alumni bios
    offsets.ts     The REC/offset comparison and the project vetting checklist
    projects.ts    Project of the Month entries + the UCapture projects grid
    solutions.ts   The 9 measures, each tiered `focus` or `available`
    newsletters.ts Newsletter issues (PDFs live in public/newsletters/)
    routes.ts      Every crawlable route's title/description/priority
  pages/         One file per route
    solutions/     9 solution pages, all wrapping <SolutionPage>
    communities/
  components/    Layout, Header, Footer, PageHeader, SolutionPage, ui.tsx primitives
  lib/
    wordpress.ts   Blog API client + HTML sanitizer
    hooks.ts       usePageMeta, usePageViews
    asset.ts       Prefixes BASE_URL onto public/ paths — use for anything there
    analytics.ts   Cookieless Plausible, only loads when its env var is set
    schema.ts      JSON-LD builders, stamped into <head> at prerender time
    useFormspree.ts  Shared submit/state machine for the contact + subscribe forms
    prerenderData.ts Lets the build hand fetched blog posts to the Node render
  entry-server.tsx  Node render entry; also re-exports what prerender.mjs needs
  index.css      The whole design system: @theme tokens, surface vars, .rich-text
scripts/
  prerender.mjs   Per-route HTML, sitemap.xml, robots.txt
  check-build.mjs Asserts the above came out right
```

### Content lives in `src/data`

Copy edits shouldn't require touching components. Adding a solution means adding a record to
`solutions.ts`, a page under `pages/solutions/`, and a route — the cards, nav dropdown and
"other measures" rail all read from the data file.

### Publishing a Project of the Month

The site's standing feature: one carbon offset project written up each month against the
checklist in `data/offsets.ts`. To publish, add an entry to the **top** of `projectsOfTheMonth`
in `src/data/projects.ts` — nothing else needs touching. The entry becomes this month's project
on the home page and `/project-of-the-month`, pushes the previous one into the archive, and
picks up its own URL, prerendered HTML, sitemap entry and link preview from `routes.ts`.

Only `slug`, `month`, `name`, `location`, `category` and `summary` are required; every other
section renders only when it's filled in. A worked example sits commented out at the bottom of
that file, and `projects.test.ts` catches the mistakes worth catching (duplicate slug, malformed
month, wrong position in the array, missing route).

### What the site argues

The positioning is deliberate and lives in three places that must not drift: `data/offsets.ts`
holds the REC/offset comparison and the vetting criteria, `site.premise` holds the one-sentence
version, and `/recs-vs-offsets` makes the case at length. Solutions are tiered — `focus`
(carbon offsets, battery storage) leads the nav and the home page; `available` is everything
still offered but no longer chased, collected at `/solutions`.

### Design system

`src/index.css` holds everything. Colours are the `forest` and `sand` ramps declared in
`@theme`; surfaces and text are `--surface` / `--ink` / `--line` custom properties, so
components reference `bg-[var(--surface)]` rather than hardcoding a colour.

The site is light-only. There was a dark theme with a header toggle; it was removed
because it earned neither the maintenance nor the extra state. If it ever comes back,
note that redefining those four custom properties under a selector is most of the job —
that indirection is why almost nothing in the components hardcodes a colour.

Section entrances use a CSS scroll timeline (`animation-timeline: view()`), not an
IntersectionObserver. Content is visible by default and the animation is layered on top only
where the browser supports it, so an unsupported engine can never leave a section blank.

### Blog

WordPress.com doesn't expose `/wp-json` on the site's own host, so `lib/wordpress.ts` uses the
public proxy:

```
https://public-api.wordpress.com/wp/v2/sites/carbonlesscommunity.wordpress.com
```

It's read-only, needs no key, and reflects the request origin in `Access-Control-Allow-Origin`,
so it can be called straight from the browser. Post bodies are run through `sanitize()` — which
strips `script`/`iframe`/`object`/`form` elements, `on*` handlers and `javascript:` URLs — before
they reach `dangerouslySetInnerHTML`. **Keep that in place**; the API returns whatever HTML is
authored in WordPress.

## Deploying

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `dist/` to GitHub
Pages. Pages must be set to **Source: GitHub Actions** — a branch source would serve this
directory, which is now source code rather than the site.

Two files the old site didn't need:

- `404.html` — GitHub Pages has no rewrite rules, so a deep link that misses a prerendered file
  falls back to this. It is deliberately the *unrendered* shell, so React Router reads the URL on
  load and renders whatever the path actually is.
- `.nojekyll` — stops Pages from processing the build output.

### Base path

Pages serves the repo from `/carbonless-website-new/`, so the build needs a matching `base`.
Vite rewrites the asset URLs it owns, but not strings like `'/images/Logo.webp'` — those go
through `asset()` in `src/lib/asset.ts`, which prefixes `import.meta.env.BASE_URL`. **Use it for
anything in `public/`.** `BrowserRouter` gets the same value as its `basename`.

The workflow also derives `SITE_URL` from the same decision, expressed absolutely. The
prerenderer stamps it into every canonical, `og:url`, `og:image` and sitemap entry, so those stay
correct on both the subpath and the custom domain.

### Cutting over to www.carbonlesscommunity.com

The domain still points at the old site's repo, so this one deliberately ships without a `CNAME`
— publishing one would take the domain over the moment the workflow ran. The stored value sits in
`CNAME.disabled` at the repo root. To cut over:

```bash
git mv CNAME.disabled public/CNAME
```

The workflow keys off that file: present means the site answers at a domain root, so it builds
with `base: '/'` instead of the subpath. Push, then remove the domain from the old repo's Pages
settings and add it to this one.
