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
| `npm run build` | Typecheck, bundle to `dist/`, then copy `index.html` → `404.html` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | oxlint |

## Layout

```
src/
  data/          Ported site content as typed records — edit here, not in JSX
    site.ts        Org details, contacts, nav tree
    people.ts      Team and alumni bios
    solutions.ts   The 8 partner measures + UCapture offset projects
  pages/         One file per route
    solutions/     8 solution pages, all wrapping <SolutionPage>
    communities/
  components/    Layout, Header, Footer, PageHeader, SolutionPage, ui.tsx primitives
  lib/
    wordpress.ts   Blog API client + HTML sanitizer
    hooks.ts       useTheme, usePageMeta
  index.css      The whole design system: @theme tokens, light/dark vars, .rich-text
```

### Content lives in `src/data`

Copy edits shouldn't require touching components. Adding a solution means adding a record to
`solutions.ts`, a page under `pages/solutions/`, and a route — the cards, nav dropdown and
"other measures" rail all read from the data file.

### Design system

`src/index.css` holds everything. Colours are the `forest` and `sand` ramps declared in
`@theme`; light and dark values are paired as `--surface` / `--ink` / `--line` custom
properties, so components reference `bg-[var(--surface)]` rather than `bg-white dark:bg-...`.

Dark mode is a `.dark` class on `<html>`, toggled by `useTheme` and persisted to
`localStorage` under `cc-theme`; it defaults to the OS preference.

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

- `404.html` — GitHub Pages has no rewrite rules, so a deep link like `/solutions/enerfusion`
  would 404 on refresh. `npm run build` copies `index.html` over it, which hands the URL back to
  React Router.
- `.nojekyll` — stops Pages from processing the build output.

### Base path

Pages serves the repo from `/carbonless-website-new/`, so the build needs a matching `base`.
Vite rewrites the asset URLs it owns, but not strings like `'/images/Logo.png'` — those go
through `asset()` in `src/lib/asset.ts`, which prefixes `import.meta.env.BASE_URL`. **Use it for
anything in `public/`.** `BrowserRouter` gets the same value as its `basename`.

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
