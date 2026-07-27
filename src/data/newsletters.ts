import { asset } from '@/lib/asset'

export type Newsletter = {
  /** Display title for the issue. */
  title: string
  /** ISO date — sorted on, and rendered via `formatDate`. */
  date: string
  /** Path under public/, passed through `asset()` so it survives a subpath base. */
  file: string
  /** One line on what's in the issue. Optional, but it's what makes the list scannable. */
  summary?: string
}

/**
 * Newsletter issues, newest first.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * TO ADD AN ISSUE: drop the PDF in `public/newsletters/` and add a record here.
 * Nothing else needs touching — the page, the "current" callout and the archive
 * list all read from this array.
 *
 * While this list has only the 2020 issue, `/newsletters` is marked `draft` in
 * `data/routes.ts`, which keeps it out of the sitemap. Remove that flag once
 * there's a second issue.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const newsletters: Newsletter[] = [
  {
    title: 'October 2020',
    date: '2020-10-01',
    file: asset('/oct2020.pdf'),
    summary:
      'Community solar in Illinois, the case for efficiency first, and where our offset projects stood going into the winter.',
  },
]

/** Newest issue, or undefined while the list is empty. */
export const currentNewsletter = (): Newsletter | undefined =>
  [...newsletters].sort((a, b) => b.date.localeCompare(a.date))[0]

/** Everything but the newest, newest-first. */
export const pastNewsletters = (): Newsletter[] =>
  [...newsletters].sort((a, b) => b.date.localeCompare(a.date)).slice(1)
