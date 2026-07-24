import { useState } from 'react'
import PageHeader from '@/components/PageHeader'
import { Button, Container, Eyebrow, Quote, Reveal, Section, cx } from '@/components/ui'
import { people, type Person } from '@/data/people'
import { usePageMeta } from '@/lib/hooks'

function PersonCard({ person }: { person: Person }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-forest-400 hover:shadow-xl hover:shadow-forest-950/8">
      <div className="aspect-4/3 overflow-hidden bg-[var(--surface-alt)]">
        <img
          src={person.image}
          alt={person.name}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg leading-snug font-semibold text-[var(--ink)]">
          {person.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-forest-600 dark:text-forest-300">
          {person.role}
        </p>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--ink-muted)]">
          {person.bullets.map((b) => (
            <li key={b} className="flex gap-2.5">
              <span
                aria-hidden="true"
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-forest-400"
              />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function About() {
  usePageMeta(
    'About Us',
    'The mission of Carbonless Community and the people behind it.',
  )
  const [showAlumni, setShowAlumni] = useState(false)

  const current = people.filter((p) => p.current)
  const alumni = people.filter((p) => !p.current)

  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Reducing emissions shouldn’t be hard — or expensive"
        lede="Reducing greenhouse gas emissions, most notably carbon dioxide, does not have to be difficult nor does it have to be costly."
      />

      <Section>
        <Container size="narrow">
          <Reveal>
            <div className="rich-text">
              <p>
                The mission of Carbonless Community is to assist groups of like-minded people in
                executing easy and thoughtful measures that not only reduce their personal carbon
                footprints, but also reduce the carbon footprint of the larger community to which
                they belong — all the while, saving money.
              </p>
              <p>
                Carbonless Community expands your organization’s activities to include specific
                carbon avoidance measures taken by employees, staff, faculty, students and their
                immediate and extended families.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="mt-14">
            <Quote attribution="Craig Schuttenberg" role="President of Carbonless Community">
              There is no single measure that will act as a silver bullet to solve the carbon threat
              to our environment. Many measures have attractive project economics, while others will
              have no quantifiable revenue streams. We can help assess your threats and
              opportunities to build a comprehensive plan that achieves your goals.
            </Quote>
          </Reveal>
        </Container>
      </Section>

      <Section tone="alt">
        <Container size="wide">
          <Reveal>
            <Eyebrow>People</Eyebrow>
            <h2 className="font-display text-3xl leading-tight font-semibold text-[var(--ink)] sm:text-4xl">
              The team
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {current.map((person, i) => (
              <Reveal key={person.name} delay={i * 80}>
                <PersonCard person={person} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-10">
              <div>
                <h3 className="font-display text-2xl font-semibold text-[var(--ink)]">
                  Alumni
                </h3>
                <p className="mt-2 text-[var(--ink-muted)]">
                  {alumni.length} former CTOs who built what the organization runs on today.
                </p>
              </div>
              <Button variant="secondary" onClick={() => setShowAlumni((v) => !v)}>
                {showAlumni ? 'Hide alumni' : 'Show alumni'}
              </Button>
            </div>
          </Reveal>

          <div
            className={cx(
              'grid gap-6 overflow-hidden transition-all duration-500 ease-[var(--ease-out-soft)] sm:grid-cols-2 lg:grid-cols-3',
              showAlumni ? 'mt-8 opacity-100' : 'max-h-0 opacity-0',
            )}
            aria-hidden={!showAlumni}
          >
            {alumni.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
