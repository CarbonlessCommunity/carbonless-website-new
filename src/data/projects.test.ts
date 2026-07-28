import { describe, expect, it } from 'vitest'
import {
  archivedProjects,
  currentProject,
  formatMonth,
  getProject,
  projectsOfTheMonth,
} from './projects'
import { routes } from './routes'

/**
 * The Project of the Month feature is a monthly hand-edit to a data file by
 * whoever is writing that month's project — which makes it the one place in the
 * codebase most likely to receive a typo under time pressure, on the day the
 * write-up is due.
 *
 * These assertions are mostly vacuous while the archive is empty, and that is
 * fine: they exist to fire the first time an entry is added with a duplicated
 * slug, a month in the wrong shape, or in the wrong position in the array. All
 * three would otherwise surface as something subtle — a page that renders the
 * wrong project as "this month", or two entries fighting over one URL.
 */
describe('formatMonth', () => {
  it('renders an ISO month as a name and year', () => {
    expect(formatMonth('2026-08')).toBe('August 2026')
    expect(formatMonth('2026-01')).toBe('January 2026')
    expect(formatMonth('2026-12')).toBe('December 2026')
  })

  it('does not slip a month backwards in a western timezone', () => {
    // `new Date('2026-08')` is UTC midnight, which is July 31st in Chicago.
    // This is the bug the hand-rolled parse exists to avoid.
    expect(formatMonth('2026-08')).not.toContain('July')
  })

  it('passes through anything it cannot parse', () => {
    expect(formatMonth('nonsense')).toBe('nonsense')
    expect(formatMonth('2026-13')).toBe('2026-13')
  })
})

describe('projectsOfTheMonth', () => {
  it('gives every project a unique, URL-safe slug', () => {
    const slugs = projectsOfTheMonth.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('dates every project as YYYY-MM', () => {
    for (const project of projectsOfTheMonth) {
      expect(project.month).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/)
    }
  })

  it('is ordered newest first', () => {
    const months = projectsOfTheMonth.map((p) => p.month)
    expect(months).toStrictEqual([...months].sort().reverse())
  })

  it('treats the first entry as this month and the rest as the archive', () => {
    expect(currentProject).toBe(projectsOfTheMonth[0] ?? null)
    expect(archivedProjects).toStrictEqual(projectsOfTheMonth.slice(1))
  })

  it('looks a project up by slug', () => {
    for (const project of projectsOfTheMonth) {
      expect(getProject(project.slug)).toBe(project)
    }
    expect(getProject('no-such-project')).toBeUndefined()
  })

  /**
   * Without this, adding a project would render at runtime but never be
   * prerendered — no static HTML, no sitemap entry, no link preview. The page
   * would look fine to whoever added it and be invisible to everyone else.
   */
  it('gives every project a crawlable route', () => {
    const paths = new Set(routes.map((r) => r.path))
    for (const project of projectsOfTheMonth) {
      expect(paths).toContain(`/project-of-the-month/${project.slug}`)
    }
  })
})
