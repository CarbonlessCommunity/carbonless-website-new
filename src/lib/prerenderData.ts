import type { Post } from './wordpress'

/**
 * Data handed to the app by the build-time prerender, so blog pages can render
 * with real content in Node instead of a loading skeleton.
 *
 * The blog fetches in an effect, and effects don't run during
 * `renderToString` — without this the prerendered blog pages would ship the
 * skeleton to crawlers, which is the exact problem prerendering is meant to fix.
 *
 * In the browser this stays empty and the pages fetch as they always have.
 */
export type PrerenderData = {
  posts?: Post[]
  post?: Post
}

let data: PrerenderData = {}

export function setPrerenderData(next: PrerenderData) {
  data = next
}

export function getPrerenderData(): PrerenderData {
  return data
}
