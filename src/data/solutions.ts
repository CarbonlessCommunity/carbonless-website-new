import { asset } from '@/lib/asset'

/**
 * How hard we push a measure.
 *
 * `focus` is what the practice is actually built around and what the home page,
 * the nav and the outreach lead with. `available` is real, still offered, and
 * arranged for anyone who asks — but not what we spend the week on.
 *
 * The distinction is deliberate rather than cosmetic. Retail electricity and gas
 * brokering has almost no barrier to entry, which means the way to grow it is to
 * cold-call buyers who are already being called by a dozen brokers with a
 * relationship and a lower number. Rooftop PV lost enough of its tax treatment
 * in 2025 that the pool of good fits shrank with it. Both are still here for
 * clients who want them; neither is worth building a business around.
 */
export type Tier = 'focus' | 'available'

export type Solution = {
  slug: string
  name: string
  /** Short label used on cards and in the nav */
  summary: string
  /** Long-form intro shown under the page title */
  lede: string
  /** Optional: pages and cards fall back to a typographic plate without it. */
  image?: string
  /** Logo shown on the solutions index; falls back to `image` */
  logo?: string
  externalUrl?: string
  externalLabel?: string
  tier: Tier
}

export const solutions: Solution[] = [
  {
    slug: 'carbon-offsets',
    name: 'Carbon Offsets',
    summary:
      'Projects that avoid, reduce or remove greenhouse gases — each one vetted, named, and sold with the objection to it stated up front.',
    lede: 'There is no way to get a footprint to zero today without some kind of offsetting instrument. The question is whether the one you buy changes anything.',
    image: asset('/images/ucapture.webp'),
    externalUrl: 'https://www.ucapture.com/projects',
    externalLabel: 'Browse UCapture projects',
    tier: 'focus',
  },
  {
    slug: 'batteries',
    name: 'Battery Storage',
    summary:
      'Storage behind the meter for backup power, demand charge management and frequency response — the one hardware measure whose economics still stand on their own.',
    lede: 'Batteries earn their keep in more than one way at once, which is why they survived the change in tax treatment that rooftop solar did not.',
    tier: 'focus',
  },
  {
    slug: 'community-solar',
    name: 'Community Solar with Nexamp',
    summary:
      'Roughly 50% of homes can’t support rooftop solar. Community Solar is an easy way to back local clean energy and save up to 20% on electricity supply costs.',
    lede: 'Save up to 20% on annual electric supply costs while truly supporting renewable energy in Illinois.',
    image: asset('/images/Nexamp_1.webp'),
    logo: asset('/images/nexamp_logo.webp'),
    externalUrl: 'http://www.ilsolar.us',
    externalLabel: 'Sign up at ilsolar.us',
    tier: 'available',
  },
  {
    slug: 'reverse-auction',
    name: 'Reverse Energy Auction',
    summary:
      'An online reverse auction platform — endorsed by EPA Green Power Partners as a way of driving down the cost of green energy.',
    lede: 'In many states, communities can buy their electricity from renewable sources rather than from the local utility. We help with the procurement.',
    image: asset('/images/auction.webp'),
    logo: asset('/images/satori.webp'),
    externalUrl: 'https://www.satorienergy.com/energy-solutions/auction/',
    externalLabel: 'Satori Energy',
    tier: 'available',
  },
  {
    slug: 'energy-star',
    name: 'Energy Star Appliances',
    summary:
      'The easiest way to reduce your carbon footprint is to choose the right household appliance when you need to upgrade.',
    lede: 'When it comes time to buy a new appliance, it makes sense to purchase an Energy Star rated one.',
    image: asset('/images/image5-1920.webp'),
    logo: asset('/images/energy-star-logo.webp'),
    tier: 'available',
  },
  {
    slug: 'efficient-cars',
    name: 'Energy Efficient Cars',
    summary:
      'A listing of suggested fuel-efficient cars — all of which burn significantly less fuel than the current CAFE standard.',
    lede: 'Why not buy a car that will not only save money on fuel, but also reduce future carbon emissions?',
    image: asset('/images/go-green-transportation-car.webp'),
    tier: 'available',
  },
  {
    slug: 'enerfusion',
    name: 'EnerFusion',
    summary:
      'Solar PV charging tables that provide meeting space plus 110 VAC and USB charging for laptops, phones and other devices.',
    lede: 'Go on, plug in green.',
    image: asset('/images/orion.webp'),
    logo: asset('/images/enerfusion-logo.webp'),
    externalUrl: 'http://www.enerfusioninc.com',
    externalLabel: 'enerfusioninc.com',
    tier: 'available',
  },
  {
    slug: 'xl-hybrids',
    name: 'XL Hybrids',
    summary:
      'Hybrid conversion technology that transforms existing Class 2–4 fleet vehicles into hybrid electrics — a 20% reduction in CO₂ emissions.',
    lede: 'Cut fuel costs, reduce exposure to fuel price fluctuations, and reduce emissions. Why wait?',
    image: asset('/images/XLPage-1200.webp'),
    logo: asset('/images/XLlogo.webp'),
    tier: 'available',
  },
  {
    slug: 'qcoefficient',
    name: 'QCoefficient',
    summary:
      'Technology that uses the thermal mass of your buildings to vary consumption over short periods and minimize electricity price risk.',
    lede: 'For those choosing to purchase power from a renewable energy generator, QCoefficient’s technology could be most helpful.',
    image: asset('/images/qlogoBlue.webp'),
    // qlogo.png is the white knockout — unusable on the white logo plate
    logo: asset('/images/qlogoBlue.webp'),
    tier: 'available',
  },
]

export const focusSolutions = solutions.filter((s) => s.tier === 'focus')
export const otherSolutions = solutions.filter((s) => s.tier !== 'focus')

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug)
