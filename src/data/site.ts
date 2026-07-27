export const site = {
  name: 'Carbonless Community',
  tagline: 'Reducing your carbon footprint is easy — and can save you money.',
  definition:
    '… a collection of individuals sharing common characteristics or interests, distinct from the larger society, working cooperatively to reduce greenhouse gas emissions, thereby reducing the impact on our planet.',
  blogUrl: 'https://carbonlesscommunity.wordpress.com/',
  founded: 2012,
}

export type ImpactStat = {
  /** The number itself, already formatted — '12', '1,400 t', '20%'. */
  value: string | null
  label: string
  /** Optional line of context under the number. */
  note?: string
}

/**
 * The proof strip on the home page: the numbers a visitor looks for before
 * deciding the organization is real.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * TO TURN THIS ON: replace any `value: null` with a real figure.
 *
 * A null means "we don't know this yet" and that stat is simply left out — you
 * don't need all four to ship. The strip appears once at least two have values
 * and stays hidden below that, since a lone number reads as an orphan.
 *
 * Never fill one in to make the grid look even. An unverified number on the
 * home page costs more credibility than a missing section does.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const impactStats: ImpactStat[] = [
  { value: null, label: 'Communities formed', note: 'Organizations running a Carbonless Community' },
  { value: null, label: 'Tons of CO₂ avoided', note: `Across all measures since ${site.founded}` },
  { value: null, label: 'Members participating', note: 'People tracking actions with us' },
  { value: null, label: 'Saved on energy bills', note: 'Typical member savings to date' },
]

export type Testimonial = {
  quote: string
  /** Who said it. Required — an unattributed quote is decoration, not evidence. */
  name: string
  /** Their role at the organization. */
  role: string
  /** The organization. This is the part that does the persuading. */
  org: string
}

/**
 * Named participants vouching for the work.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * TO TURN THIS ON: add entries. The home page section renders nothing while the
 * array is empty, so the code ships inert.
 *
 * Every field is required on purpose. "A community organizer" persuades nobody;
 * one real name attached to one real organization is worth more than a page of
 * copy. Only add quotes you have permission to publish.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const testimonials: Testimonial[] = []

export const contacts = [
  {
    name: 'Craig Schuttenberg',
    role: 'President & CEO, Carbonless Community',
    phone: '(773) 491-1564',
    phoneHref: 'tel:+17734911564',
    email: 'craig@carbonlesscommunity.com',
  },
  {
    name: 'Jamie Cahillane',
    role: 'Carbon Offsets',
    phone: '(413) 329-6546',
    phoneHref: 'tel:+14133296546',
    email: 'jcahillane9@gmail.com',
  },
] as const

export type NavChild = { label: string; to: string; blurb?: string }
export type NavItem = { label: string; to?: string; children?: NavChild[] }

export const nav: NavItem[] = [
  { label: 'About', to: '/about' },
  {
    label: 'Solutions',
    to: '/solutions',
    children: [
      {
        label: 'Carbon Offsets',
        to: '/solutions/carbon-offsets',
        blurb: 'Verified projects with UCapture — Scope 1, 2 and 3.',
      },
      {
        label: 'Community Solar',
        to: '/solutions/community-solar',
        blurb: 'Save up to 20% with Nexamp — no rooftop panels needed.',
      },
      {
        label: 'Reverse Energy Auction',
        to: '/solutions/reverse-auction',
        blurb: 'Drive down the cost of green energy procurement.',
      },
      {
        label: 'Energy Star Appliances',
        to: '/solutions/energy-star',
        blurb: 'The simplest way to cut a household footprint.',
      },
      {
        label: 'Energy Efficient Cars',
        to: '/solutions/efficient-cars',
        blurb: 'Vehicles that beat the current CAFE standard.',
      },
      {
        label: 'EnerFusion',
        to: '/solutions/enerfusion',
        blurb: 'Solar PV charging tables. Go on, plug in green.',
      },
      {
        label: 'XL Hybrids',
        to: '/solutions/xl-hybrids',
        blurb: '20% less CO₂ from Class 2–4 fleet vehicles.',
      },
      {
        label: 'QCoefficient',
        to: '/solutions/qcoefficient',
        blurb: 'Use your building’s thermal mass to cut price risk.',
      },
    ],
  },
  {
    label: 'Communities',
    to: '/communities',
    children: [
      {
        label: 'Why Join',
        to: '/communities',
        blurb: 'What a Carbonless Community actually does.',
      },
      {
        label: 'Create a Community',
        to: '/communities/create',
        blurb: 'All you need is 100 committed people.',
      },
      {
        label: 'CC Tracker App',
        to: '/communities/app',
        blurb: 'Track daily actions. Compete. Cooperate.',
      },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Blog', to: '/blog', blurb: 'All sides of the energy conversation.' },
      { label: 'Newsletters', to: '/newsletters', blurb: 'Periodic updates from the team.' },
      { label: 'Products Corner', to: '/products-corner', blurb: 'Repurposed and reclaimed materials.' },
      { label: 'Technology Corner', to: '/technology-corner', blurb: 'Emerging low-carbon technology.' },
    ],
  },
]
