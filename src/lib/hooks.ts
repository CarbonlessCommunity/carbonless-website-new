import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { loadAnalytics, trackPageView } from './analytics'

/** Sets document.title and the meta description for the current page. */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = `${title} — Carbonless Community`
    if (!description) return
    const tag = document.querySelector('meta[name="description"]')
    const previous = tag?.getAttribute('content')
    tag?.setAttribute('content', description)
    return () => {
      if (previous) tag?.setAttribute('content', previous)
    }
  }, [title, description])
}

/**
 * Reports one analytics page view per route. Mounted once, in the layout.
 *
 * `usePageMeta` has already set `document.title` by the time this effect runs —
 * both fire on the same commit, and effects run in mount order, layout before
 * page. That ordering only matters for the title Plausible attaches to the
 * event; the URL, which is what it keys on, is correct either way.
 */
export function usePageViews() {
  const { pathname } = useLocation()

  useEffect(() => {
    loadAnalytics()
  }, [])

  useEffect(() => {
    trackPageView()
  }, [pathname])
}
