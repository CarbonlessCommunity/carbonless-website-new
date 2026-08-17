import type { Post } from './wordpress'

/**
 * Blog content handed to the app by the build-time prerender.
 *
 * The blog fetches in an effect, and effects don't run during
 * `renderToString` — without this the prerendered blog pages would ship the
 * skeleton to crawlers, which is the exact problem prerendering is meant to fix.
 *
 * The browser gets the same payload back out of `window.__PRERENDER__`, which
 * `scripts/prerender.mjs` writes into each blog page. That matters because the
 * client entry mounts with `createRoot`, not `hydrateRoot`: React throws the
 * prerendered markup away and renders from its own state. With nothing seeding
 * that state, a reader watched the real post they were already looking at get
 * replaced by a loading skeleton until the API answered.
 */
export type PrerenderData = {
  posts?: Post[]
  post?: Post
}

declare global {
  interface Window {
    __PRERENDER__?: PrerenderData
  }
}

/**
 * Read once at module load rather than per call: the script tag is inline and
 * the app bundle is a deferred module, so the value is always in place by now,
 * and reading once keeps the object identity stable for the `useState`
 * initializers that consume it.
 */
function initial(): PrerenderData {
  if (typeof window === 'undefined') return {}
  return window.__PRERENDER__ ?? {}
}

let data: PrerenderData = initial()

/** Used by the Node render to scope a payload to one route. */
export function setPrerenderData(next: PrerenderData) {
  data = next
}

export function getPrerenderData(): PrerenderData {
  return data
}
