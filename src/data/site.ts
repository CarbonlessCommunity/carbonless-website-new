export const site = {
  name: 'Carbonless Community',
  tagline: 'Reducing your carbon footprint is easy — and can save you money.',
  definition:
    '… a collection of individuals sharing common characteristics or interests, distinct from the larger society, working cooperatively to reduce greenhouse gas emissions, thereby reducing the impact on our planet.',
  blogUrl: 'https://carbonlesscommunity.wordpress.com/',
  founded: 2012,
}

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
