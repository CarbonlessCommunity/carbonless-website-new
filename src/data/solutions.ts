export type Solution = {
  slug: string
  name: string
  /** Short label used on cards and in the nav */
  summary: string
  /** Long-form intro shown under the page title */
  lede: string
  image: string
  /** Logo shown on the solutions index; falls back to `image` */
  logo?: string
  externalUrl?: string
  externalLabel?: string
  featured?: boolean
}

export const solutions: Solution[] = [
  {
    slug: 'carbon-offsets',
    name: 'Carbon Offsets',
    summary:
      'Carbonless Community and UCapture have joined forces to bring a portfolio of carbon offset options to corporations and institutions.',
    lede: 'If chosen correctly, carbon offsets can be an effective way to mitigate your carbon footprint. But not all offsets are equal.',
    image: '/images/ucapture.png',
    externalUrl: 'https://www.ucapture.com/projects',
    externalLabel: 'Browse UCapture projects',
    featured: true,
  },
  {
    slug: 'community-solar',
    name: 'Community Solar with Nexamp',
    summary:
      'Roughly 50% of homes can’t support rooftop solar. Community Solar is an easy way to back local clean energy and save up to 20% on electricity supply costs.',
    lede: 'Save up to 20% on annual electric supply costs while truly supporting renewable energy in Illinois.',
    image: '/images/Nexamp_1.jpeg',
    logo: '/images/nexamp_logo.jpeg',
    externalUrl: 'http://www.ilsolar.us',
    externalLabel: 'Sign up at ilsolar.us',
    featured: true,
  },
  {
    slug: 'reverse-auction',
    name: 'Reverse Energy Auction',
    summary:
      'An online reverse auction platform — endorsed by EPA Green Power Partners as a way of driving down the cost of green energy.',
    lede: 'In many states, communities can buy their electricity from renewable sources rather than from the local utility. We help with the procurement.',
    image: '/images/auction.png',
    logo: '/images/satori.jpg',
    externalUrl: 'https://www.satorienergy.com/energy-solutions/auction/',
    externalLabel: 'Satori Energy',
    featured: true,
  },
  {
    slug: 'energy-star',
    name: 'Energy Star Appliances',
    summary:
      'The easiest way to reduce your carbon footprint is to choose the right household appliance when you need to upgrade.',
    lede: 'When it comes time to buy a new appliance, it makes sense to purchase an Energy Star rated one.',
    image: '/images/image5.jpg',
    logo: '/images/200px-Energy_Star_logo.svg.png',
  },
  {
    slug: 'efficient-cars',
    name: 'Energy Efficient Cars',
    summary:
      'A listing of suggested fuel-efficient cars — all of which burn significantly less fuel than the current CAFE standard.',
    lede: 'Why not buy a car that will not only save money on fuel, but also reduce future carbon emissions?',
    image: '/images/go-green-transportation-car.jpg',
  },
  {
    slug: 'enerfusion',
    name: 'EnerFusion',
    summary:
      'Solar PV charging tables that provide meeting space plus 110 VAC and USB charging for laptops, phones and other devices.',
    lede: 'Go on, plug in green.',
    image: '/images/orion.jpg',
    logo: '/images/enerfusion company logo 14d.png',
    externalUrl: 'http://www.enerfusioninc.com',
    externalLabel: 'enerfusioninc.com',
  },
  {
    slug: 'xl-hybrids',
    name: 'XL Hybrids',
    summary:
      'Hybrid conversion technology that transforms existing Class 2–4 fleet vehicles into hybrid electrics — a 20% reduction in CO₂ emissions.',
    lede: 'Cut fuel costs, reduce exposure to fuel price fluctuations, and reduce emissions. Why wait?',
    image: '/images/XLPage.jpg',
    logo: '/images/XLlogo.png',
  },
  {
    slug: 'qcoefficient',
    name: 'QCoefficient',
    summary:
      'Technology that uses the thermal mass of your buildings to vary consumption over short periods and minimize electricity price risk.',
    lede: 'For those choosing to purchase power from a renewable energy generator, QCoefficient’s technology could be most helpful.',
    image: '/images/qlogoBlue.png',
    // qlogo.png is the white knockout — unusable on the white logo plate
    logo: '/images/qlogoBlue.png',
  },
]

export const offsetProjects = [
  { image: '/images/offsets1.png', url: 'https://www.ucapture.com/projects/rwanda', name: 'Rwanda' },
  { image: '/images/offsets2.png', url: 'https://www.ucapture.com/projects/isangi', name: 'Isangi' },
  { image: '/images/offsets3.png', url: 'https://www.ucapture.com/projects/bearcreek', name: 'Bear Creek' },
  { image: '/images/offsets4.png', url: 'https://www.ucapture.com/projects/southkent', name: 'South Kent' },
  { image: '/images/offsets5.png', url: 'https://www.ucapture.com/projects/khonburi', name: 'Khon Buri' },
  { image: '/images/offsets6.png', url: 'https://www.ucapture.com/projects/seneca', name: 'Seneca' },
]

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug)
