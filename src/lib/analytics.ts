/**
 * Cookieless page-view analytics, off unless configured.
 *
 * Set `VITE_PLAUSIBLE_DOMAIN` (and optionally `VITE_PLAUSIBLE_HOST` if you
 * self-host) at build time and the script loads; leave it unset and nothing is
 * injected and nothing is requested. No cookies, no consent banner required.
 *
 * Plausible counts the first page view itself, but this is a single-page app —
 * every later navigation is a `history.pushState`, which the script does not
 * see on its own. `usePageViews` reports those.
 */
const DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined
const HOST = (import.meta.env.VITE_PLAUSIBLE_HOST as string | undefined) ?? 'https://plausible.io'

declare global {
  interface Window {
    plausible?: ((event: string, opts?: Record<string, unknown>) => void) & { q?: unknown[] }
  }
}

export const analyticsEnabled = Boolean(DOMAIN)

/** Injects the tracker once. Safe to call more than once; no-op without a domain. */
export function loadAnalytics() {
  if (!DOMAIN || typeof document === 'undefined') return
  if (document.getElementById('plausible-script')) return

  // Queue stub, per Plausible's own snippet: `pageview` calls made before the
  // script finishes loading land in `.q` and are replayed once it does.
  if (!window.plausible) {
    const stub = (...args: unknown[]) => {
      ;(stub.q ||= []).push(args)
    }
    stub.q = undefined as unknown[] | undefined
    window.plausible = stub as unknown as Window['plausible']
  }

  const el = document.createElement('script')
  el.id = 'plausible-script'
  el.defer = true
  el.dataset.domain = DOMAIN
  // `manual` — this app reports its own views so SPA navigations are counted.
  el.src = `${HOST}/js/script.manual.js`
  document.head.appendChild(el)
}

/** Reports one page view for the current URL. */
export function trackPageView() {
  if (!DOMAIN) return
  window.plausible?.('pageview')
}
