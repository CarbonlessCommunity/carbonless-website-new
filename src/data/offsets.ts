/**
 * The argument the site is built around: what separates a Renewable Energy
 * Certificate from a carbon offset, and what we check before we will put a
 * project in front of a client.
 *
 * This lives in data rather than in page copy because three pages make the same
 * argument at different lengths — the home page in a paragraph, /recs-vs-offsets
 * in full, and each Project of the Month against the checklist. One source keeps
 * them from drifting into three slightly different claims.
 */

export type ComparisonRow = {
  /** The question a buyer is actually asking. */
  question: string
  rec: string
  offset: string
}

/**
 * Side by side, RECs and offsets, on the points that decide whether a purchase
 * changes anything in the atmosphere.
 *
 * Deliberately not a scorecard. RECs are a legitimate, regulated instrument and
 * plenty of good organizations buy them for defensible reasons; the case here is
 * that most buyers have never been told what the instrument does and does not
 * do, not that they have been foolish.
 */
export const comparison: ComparisonRow[] = [
  {
    question: 'What is the unit?',
    rec: 'One megawatt-hour of renewable electricity generated somewhere on the grid.',
    offset: 'One metric tonne of CO₂ equivalent avoided, reduced or removed (MTCO₂e).',
  },
  {
    question: 'What are you actually buying?',
    rec: 'The environmental attribute of power that was generated anyway, unbundled from the electricity itself.',
    offset: 'A share of a specific project’s measured climate result, retired in your name.',
  },
  {
    question: 'Does it have to pass a test of additionality?',
    rec: 'No. Nothing requires the money to cause a reduction that would not have happened otherwise.',
    offset: 'Yes. Additionality is the central question a credible standard asks before issuing a credit.',
  },
  {
    question: 'Where does the project sit?',
    rec: 'Inside the United States — most commonly an established wind farm in another state.',
    offset: 'Anywhere. The atmosphere is one system, so a tonne avoided in Rwanda counts as a tonne.',
  },
  {
    question: 'What can it offset?',
    rec: 'Purchased electricity — Scope 2 — and nothing else.',
    offset: 'Scope 1, 2 or 3: building heat, fleet fuel, air travel, supply chain, electricity.',
  },
  {
    question: 'Is it verified?',
    rec: 'Yes — tracked and retired through regional generation attribute systems.',
    offset: 'Yes — issued and retired through the Gold Standard, Verra, the American Carbon Registry, the Climate Action Reserve and others.',
  },
  {
    question: 'What does it cost?',
    rec: 'Unbundled RECs are inexpensive, which is a large part of why they are the default.',
    offset: 'More per tonne, and the range is wide — the price is largely a function of how hard the project’s claim is to prove.',
  },
  {
    question: 'Is there a story to tell your stakeholders?',
    rec: 'A wind farm in North Dakota that was already turning.',
    offset: 'A named project, its beneficiaries, and what changed for them.',
  },
]

export type Criterion = {
  title: string
  /** What we ask. */
  body: string
  /** The failure this question is designed to catch. */
  failureMode: string
}

/**
 * The checklist every Project of the Month is written against.
 *
 * The honest objection to offsets is that some projects do not do anything of
 * consequence — the classic case being a promise not to log a forest nobody was
 * going to log. That objection is correct often enough that answering it in
 * public, project by project, is the work. These are the questions.
 */
export const vettingCriteria: Criterion[] = [
  {
    title: 'Additionality',
    body: 'Would these tonnes have stayed out of the atmosphere without the money? If the answer is yes, there is nothing to sell.',
    failureMode: 'Crediting a reduction that was already going to happen — the single most common way an offset turns out to be worthless.',
  },
  {
    title: 'A defensible baseline',
    body: 'What would have happened otherwise has to be measured against something conservative, not against the most flattering counterfactual available.',
    failureMode: 'A baseline chosen to inflate the tonnes, such as assuming a forest was destined for the mill.',
  },
  {
    title: 'Permanence',
    body: 'Carbon put into a tree can come back out in a fire. We ask how long the reduction holds and what backs it if it fails.',
    failureMode: 'A reversal a few years after the credit was retired, with no buffer pool behind it.',
  },
  {
    title: 'Leakage',
    body: 'If the activity simply moves next door, nothing was avoided. The project has to account for what it pushed elsewhere.',
    failureMode: 'Protected hectares here, cleared hectares one valley over.',
  },
  {
    title: 'One tonne, counted once',
    body: 'The credit must be issued on a recognized registry and retired in your name, where anyone can check that no one else has claimed it.',
    failureMode: 'The same reduction sold twice, or claimed both by the buyer and by the host country.',
  },
  {
    title: 'Co-benefits that are real',
    body: 'Most good projects do something else for the people living with them — cleaner air indoors, safe water, local jobs. We want that named and specific.',
    failureMode: 'A brochure claim that does not survive contact with the project documents.',
  },
]
