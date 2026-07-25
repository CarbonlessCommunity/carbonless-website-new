import { asset } from '@/lib/asset'

export type Person = {
  name: string
  role: string
  image: string
  current: boolean
  bullets: string[]
}

export const people: Person[] = [
  {
    name: 'Craig Schuttenberg, PE MBA',
    role: 'CEO, Carbonless Community',
    image: asset('/images/craig2.webp'),
    current: true,
    bullets: [
      'Director of Energy Planning at the University of Chicago',
      'Started a consulting firm in 1997',
      'Started Carbonless Community in 2012',
      'Initiated CFL distribution at a local Chicago food pantry resulting in over $1 million in energy savings for families in need (equivalent to taking 275 cars off the road)',
      'Developed the not-for-profit Energy and Actions for Sustainable Energy Efficiency (EASEE)',
      'Energy Savings Program — developed the only electricity aggregation program in Illinois (opt-in or opt-out) that provided energy saving equipment to residential customers of ComEd',
    ],
  },
  {
    name: 'Jeffrey Huang',
    role: 'Chief Technology Officer',
    image: asset('/images/Jeffrey.webp'),
    current: true,
    bullets: [
      'University of Chicago Laboratory Schools',
      'Director of Student Technology Services at Lab',
      'Three-time Intern Developer for Yuejiang Technology Co., Ltd. (Dobot)',
      'App development / electronics YouTube creator with 3,000+ subscribers and 800,000+ views',
    ],
  },
  {
    name: 'Adam Tang',
    role: 'Director of IT Operations',
    image: asset('/images/Adam.webp'),
    current: true,
    bullets: ['University of Chicago Laboratory Schools'],
  },
  {
    name: 'Roma Bhattacharjee',
    role: 'Former Chief Technology Officer',
    image: asset('/images/Roma2.webp'),
    current: false,
    bullets: [
      'University of Chicago Laboratory Schools',
      'Software Engineering Intern at Citadel, LLC',
      'Director of Student Technology Services at the Laboratory Schools',
      'Research Assistant at UChicago Giger Lab',
      '“COVID Alliance” Data Engineer',
    ],
  },
  {
    name: 'Benjamin Cifu',
    role: 'Former Chief Technology Officer',
    image: asset('/images/Ben.webp'),
    current: false,
    bullets: [
      'University of Chicago Laboratory Schools',
      'Software Engineering Intern at Citadel, LLC',
      'Computer Assisted Diagnosis Lab Assistant',
      'Machine Learning',
    ],
  },
  {
    name: 'Campbell Phalen',
    role: 'Former Chief Technology Officer',
    image: asset('/images/Campbell.webp'),
    current: false,
    bullets: [
      'University of Chicago Laboratory Schools',
      'University of Chicago Master in Computer Science Program',
      'Two-year software engineer for Citadel, LLC',
      'Director of Student Technology Services',
      'Functional Programming',
    ],
  },
  {
    name: 'Harrison Shapiro',
    role: 'Former Chief Technology Officer',
    image: asset('/images/harrison2.webp'),
    current: false,
    bullets: [
      'Trained at the University of Chicago Laboratory Schools',
      'Worked at the UChicago Institute for Molecular Engineering',
      'Treasurer and Board Member, UCLS Model UN (National Top 5 Team)',
    ],
  },
  {
    name: 'Jeremy Archer',
    role: 'Former Chief Technology Officer',
    image: asset('/images/blank_person.webp'),
    current: false,
    bullets: [
      'Trained at the University of Chicago',
      'Developed the Carbonless Community App — a personal daily carbon monitoring system',
      'Developed Carbonless Community’s online reverse auction platform',
      'Currently works full-time at Google',
      'Competes in several programming competitions each year',
    ],
  },
  {
    name: 'Jonathan Lipman',
    role: 'Former Chief Technology Officer',
    image: asset('/images/jonathan.webp'),
    current: false,
    bullets: [
      'Trained at Stanford University',
      'Computation Institute (at the University of Chicago)',
      'Citadel LLC',
      'Machine Learning',
    ],
  },
]
