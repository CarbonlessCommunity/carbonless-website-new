import { asset } from '@/lib/asset'

/**
 * Project of the Month.
 *
 * The point of this feature is the cadence, not any one entry. Publishing a
 * project every month — written against the checklist in `data/offsets.ts` —
 * forces a standing reason to look at the market, gives the mailing list
 * something to arrive for, and builds an archive that shows the depth and
 * breadth of what carbon offsets actually cover. A page that is only updated
 * when someone feels like it is the thing this is meant to prevent.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * TO PUBLISH A MONTH: add an entry to the top of `projectsOfTheMonth`.
 *
 * Newest first. The first entry is "this month"; everything below it becomes
 * the archive automatically, and each entry gets its own URL, its own slot in
 * the sitemap and its own social preview — no other file needs touching.
 *
 * Only `slug`, `month`, `name`, `location`, `category` and `summary` are
 * required. Every other field renders only when it is filled in, so a project
 * can go up with what is known and gain its scrutiny note later. Leave a field
 * out rather than guessing at it: the whole argument of this site is that the
 * unverified claim is what is wrong with the market.
 *
 * A worked example is at the bottom of this file, commented out.
 * ────────────────────────────────────────────────────────────────────────────
 */
export type MonthlyProject = {
  /** URL segment: /project-of-the-month/<slug>. Unique, lowercase, hyphenated. */
  slug: string
  /** ISO year and month, '2026-08'. Used for ordering and the displayed date. */
  month: string
  name: string
  /** Where it is — 'Kayonza District, Rwanda'. */
  location: string
  /** Project type — 'Improved cookstoves', 'Landfill gas capture'. */
  category: string
  /** One sentence. Used on cards, in search results and in link previews. */
  summary: string
  /** Standard the credits are issued under — 'Gold Standard', 'Verra VCS'. */
  registry?: string
  /** Volume available, already formatted — '4,200 tCO₂e'. */
  volume?: string
  /** Body copy, one string per paragraph. */
  story?: string[]
  /** Why these tonnes would not have happened without the money. */
  additionality?: string
  /** What the project does for the people living with it. */
  coBenefits?: string[]
  /**
   * The honest part: what a sceptic would push on here, and our answer.
   *
   * Every entry should have one. A month where we could not find a fair
   * objection to a project is a month we did not look hard enough.
   */
  scrutiny?: string
  /** Path from `asset()`. Falls back to a typographic plate when absent. */
  image?: string
  /** Registry listing or project page, if there is a public one. */
  externalUrl?: string
  externalLabel?: string
}

export const projectsOfTheMonth: MonthlyProject[] = []

/** This month's project, or null before the first one is published. */
export const currentProject: MonthlyProject | null = projectsOfTheMonth[0] ?? null

/** Everything behind the current one, newest first. */
export const archivedProjects: MonthlyProject[] = projectsOfTheMonth.slice(1)

export const getProject = (slug: string) => projectsOfTheMonth.find((p) => p.slug === slug)

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/**
 * '2026-08' → 'August 2026'.
 *
 * Parsed by hand rather than through `Date`: `new Date('2026-08')` is treated as
 * UTC midnight, which renders as July anywhere west of Greenwich — and this site
 * is read in Chicago.
 */
export function formatMonth(month: string): string {
  const [year, index] = month.split('-')
  const name = MONTH_NAMES[Number(index) - 1]
  return name ? `${name} ${year}` : month
}

/**
 * The offset projects the practice currently supports, shown as a grid on the
 * offsets page. These are UCapture project pages; the Project of the Month above
 * is our own write-up, which is a different and slower thing.
 */
export const supportedProjects = [
  { image: asset('/images/offsets1.webp'), url: 'https://www.ucapture.com/projects/rwanda', name: 'Rwanda' },
  { image: asset('/images/offsets2.webp'), url: 'https://www.ucapture.com/projects/isangi', name: 'Isangi' },
  { image: asset('/images/offsets3.webp'), url: 'https://www.ucapture.com/projects/bearcreek', name: 'Bear Creek' },
  { image: asset('/images/offsets4.webp'), url: 'https://www.ucapture.com/projects/southkent', name: 'South Kent' },
  { image: asset('/images/offsets5.webp'), url: 'https://www.ucapture.com/projects/khonburi', name: 'Khon Buri' },
  { image: asset('/images/offsets6.webp'), url: 'https://www.ucapture.com/projects/seneca', name: 'Seneca' },
]

/*
 * ── Worked example ──────────────────────────────────────────────────────────
 * Copy this into the array above, replace every value with what the project
 * documents actually say, and delete any field you cannot source.
 *
 * {
 *   slug: 'kayonza-cookstoves',
 *   month: '2026-08',
 *   name: 'Kayonza Improved Cookstoves',
 *   location: 'Kayonza District, Rwanda',
 *   category: 'Improved cookstoves',
 *   summary:
 *     'Efficient stoves that cut the wood a household burns roughly in half, in a district where fuel is gathered by hand.',
 *   registry: 'Gold Standard',
 *   volume: '4,200 tCO₂e available for 2026',
 *   story: [
 *     'What the project does, in plain language.',
 *     'How the tonnes are measured, and by whom.',
 *   ],
 *   additionality:
 *     'Why the stoves would not be in these households without credit revenue.',
 *   coBenefits: [
 *     'Indoor air quality for the household',
 *     'Hours of fuel gathering returned to the week',
 *   ],
 *   scrutiny:
 *     'The fair objection — usage drop-off after the first year — and what the monitoring shows.',
 *   externalUrl: 'https://registry.example.org/projects/1234',
 *   externalLabel: 'Registry listing',
 * },
 */
