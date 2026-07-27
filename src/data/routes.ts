import { solutions } from './solutions'

/**
 * Every crawlable route, with the title and description that page sets at
 * runtime via `usePageMeta`.
 *
 * Three things read this file, which is why it exists rather than each page
 * owning its own metadata alone:
 *
 *   - `scripts/prerender.mjs` writes one static HTML file per entry, with these
 *     tags baked into `<head>` so crawlers and link unfurlers see them without
 *     running JavaScript.
 *   - the same script emits `sitemap.xml` from the list.
 *   - the pages themselves still call `usePageMeta`, which keeps the tags right
 *     during client-side navigation.
 *
 * Keep `title`/`description` in sync with the page's `usePageMeta` call.
 */
export type RouteMeta = {
  /** Path with a leading slash, no trailing slash (except the root). */
  path: string
  title: string
  description: string
  /** Sitemap priority, 0–1. Defaults to 0.7. */
  priority?: number
  /**
   * A page that exists and is linked, but isn't finished enough to index.
   *
   * The prerenderer still writes its HTML — the URL has to work for anyone who
   * follows a link — but leaves it out of `sitemap.xml` and adds
   * `<meta name="robots" content="noindex">`. Thin pages in the index pull down
   * the quality signal for the whole site, so an unfinished page is better
   * unlisted than listed.
   */
  draft?: boolean
}

const staticRoutes: RouteMeta[] = [
  {
    path: '/',
    title: 'Home',
    description:
      'Carbonless Community helps groups of like-minded people reduce greenhouse gas emissions — and save money doing it.',
    priority: 1,
  },
  {
    path: '/about',
    title: 'About Us',
    description: 'The mission of Carbonless Community and the people behind it.',
    priority: 0.8,
  },
  {
    path: '/contact',
    title: 'Contact Us',
    description: 'Get in touch with the Carbonless Community team.',
    priority: 0.9,
  },
  {
    path: '/solutions',
    title: 'Solutions',
    description:
      'Carbon offsets, community solar, reverse energy auctions, efficient appliances and vehicles — the measures we help organizations put in place.',
    priority: 0.9,
  },
  {
    path: '/communities',
    title: 'Communities',
    description:
      'What a Carbonless Community is, and why an organization would want to create one.',
    priority: 0.8,
  },
  {
    path: '/communities/create',
    title: 'Create a Community',
    description:
      'All you need is a committed group of at least 100 individuals with ties to a single organization.',
    priority: 0.9,
  },
  {
    path: '/communities/app',
    title: 'CC Tracker App',
    description: 'Helping communities reduce carbon usage through friendly competition.',
  },
  {
    path: '/blog',
    title: 'Blog',
    description: 'Information on all sides of the energy and environment discussions.',
    priority: 0.8,
  },
  {
    // One issue, from 2020 — unlisted until the archive has something to it.
    // Drop `draft` once `data/newsletters.ts` holds a second entry.
    path: '/newsletters',
    title: 'Newsletters',
    description: 'Periodic updates from the Carbonless Community team.',
    priority: 0.5,
    draft: true,
  },
  {
    path: '/products-corner',
    title: 'Products Corner',
    description: 'Repurposed and reclaimed materials — reduce, reuse, repurpose.',
    priority: 0.5,
  },
  {
    // Placeholder copy ("this page is still being written") — unlisted until
    // there's something on it.
    path: '/technology-corner',
    title: 'Technology Corner',
    description: 'Emerging low-carbon technology worth paying attention to.',
    priority: 0.5,
    draft: true,
  },
]

/** Solution pages take their metadata from the solutions data, as the pages do. */
const solutionRoutes: RouteMeta[] = solutions.map((s) => ({
  path: `/solutions/${s.slug}`,
  title: s.name,
  description: s.summary,
  priority: 0.7,
}))

export const routes: RouteMeta[] = [...staticRoutes, ...solutionRoutes]
