import { renderToString } from 'react-dom/server'
// React Router 7 dropped the `react-router-dom/server` entry; StaticRouter now
// ships from `react-router` itself.
import { StaticRouter } from 'react-router'
import App from './App'
import { setPrerenderData, type PrerenderData } from './lib/prerenderData'

// Re-exported so the prerender script has a single module to import — the SSR
// build bundles this entry and everything it reaches.
export { routes } from './data/routes'
export { fetchPosts } from './lib/wordpress'
export {
  organizationSchema,
  websiteSchema,
  blogPostingSchema,
  breadcrumbSchema,
} from './lib/schema'

/**
 * Renders one route to an HTML string, for `scripts/prerender.mjs`.
 *
 * The browser entry still uses `createRoot`, not `hydrateRoot` — the markup this
 * produces is for crawlers and first paint, and React replaces it wholesale on
 * mount. That's deliberate: nothing here has to match what the client renders,
 * so locale-dependent dates and the theme class can't cause a hydration
 * mismatch. The cost is re-rendering once on load, which is cheap for a site
 * this size.
 */
export function render(url: string, data: PrerenderData = {}): string {
  setPrerenderData(data)
  try {
    return renderToString(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>,
    )
  } finally {
    setPrerenderData({})
  }
}
