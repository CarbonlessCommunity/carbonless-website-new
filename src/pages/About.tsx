import { useState } from 'react'
import { Link } from 'react-router'
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
        <p className="mt-1 text-sm font-medium text-forest-600">
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
    'Why Carbonless Community builds on carbon offsets and battery storage — and what it stepped back from.',
  )
  const [showAlumni, setShowAlumni] = useState(false)

  const current = people.filter((p) => p.current)
  const alumni = people.filter((p) => !p.current)

  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="We’d rather sell the harder thing"
        lede="Carbonless Community has been helping organizations cut emissions since 2012. What we choose to spend our time on has narrowed since — deliberately."
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

              <h2>What we choose to work on</h2>
              <p>
                Our association with Priority Power lets us offer a wide shelf: retail electricity
                and gas, demand response, behind-the-meter solar and storage, Renewable Energy
                Certificates, carbon offsets. We could sell any of it. We have decided to build the
                practice on the two that are worth the week.
              </p>
              <p>
                <strong>Carbon offsets</strong> come first, because they are the only instrument on
                that list that has to prove it changed something —{' '}
                <Link to="/recs-vs-offsets">a REC does not</Link> — and because almost nobody sells
                them. They are harder work and thinner margin than commodity energy, which is
                exactly why the field is empty and the buyers who care are underserved.{' '}
                <strong>Battery storage</strong> comes second, as the one piece of hardware whose
                economics still stand up on their own.
              </p>
              <p>
                What we have stepped back from is just as deliberate. Brokering electricity and gas
                has almost no barrier to entry, so growing it means cold-calling buyers who are
                already fielding a dozen calls a week from brokers with a relationship and a lower
                number. Rooftop solar lost enough of its federal tax treatment that the pool of
                genuinely good fits shrank with it. Both remain{' '}
                <Link to="/solutions">available to any client who wants them</Link>. Neither is what
                we get up for.
              </p>
              <p>
                To keep ourselves honest about the first of those, we publish a{' '}
                <Link to="/project-of-the-month">Project of the Month</Link>: one offset project,
                written up in full against a published checklist, including the fair objection to
                it. A dated page that would visibly go stale is a more reliable discipline than good
                intentions.
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
