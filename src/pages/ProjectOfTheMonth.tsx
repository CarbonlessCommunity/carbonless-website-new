import { Link } from 'react-router'
import PageHeader from '@/components/PageHeader'
import SubscribeForm from '@/components/SubscribeForm'
import { Arrow, Button, Container, Eyebrow, Reveal, Section } from '@/components/ui'
import { vettingCriteria } from '@/data/offsets'
import { archivedProjects, currentProject, formatMonth } from '@/data/projects'
import { usePageMeta } from '@/lib/hooks'

/**
 * The standing feature: one offset project written up every month.
 *
 * It exists as much for the practice as for the reader. Selling offsets has no
 * natural rhythm — no renewal date, no billing cycle — so without a published
 * commitment the outreach quietly stops. A dated page that visibly went stale is
 * the point: it is the thing that makes the work happen.
 *
 * The page carries its own weight before the first entry ships. The checklist
 * below is the methodology, and it is worth reading whether or not there is a
 * project sitting above it yet.
 */
export default function ProjectOfTheMonth() {
  usePageMeta(
    'Project of the Month',
    'One carbon offset project every month — what it does, why the tonnes are additional, and the fair objection to it.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Every month"
        title="Project of the Month"
        lede="One carbon offset project, examined in full: what it does, how the tonnes are measured, why they are additional — and the strongest fair objection to it, answered rather than avoided."
      >
        {currentProject ? (
          <Button to={`/project-of-the-month/${currentProject.slug}`}>
            Read {formatMonth(currentProject.month)}
          </Button>
        ) : (
          <Button to="/solutions/carbon-offsets">How we choose projects</Button>
        )}
        <Button to="/recs-vs-offsets" variant="secondary">
          Why not just buy RECs?
        </Button>
      </PageHeader>

      {currentProject ? (
        <Section>
          <Container size="wide">
            <Reveal>
              <Eyebrow>{formatMonth(currentProject.month)}</Eyebrow>
              <Link
                to={`/project-of-the-month/${currentProject.slug}`}
                className="group grid items-center gap-10 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 transition-all duration-300 ease-[var(--ease-out-soft)] hover:border-forest-400 hover:shadow-xl hover:shadow-forest-950/8 sm:p-10 lg:grid-cols-[1.3fr_1fr]"
              >
                <div>
                  <h2 className="font-display text-3xl leading-tight font-semibold text-[var(--ink)] sm:text-4xl">
                    {currentProject.name}
                  </h2>
                  <p className="mt-3 text-sm font-semibold tracking-wide text-forest-700">
                    {currentProject.category} · {currentProject.location}
                  </p>
                  <p className="mt-5 text-lg leading-relaxed text-[var(--ink-muted)]">
                    {currentProject.summary}
                  </p>
                  <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4 text-sm">
                    {currentProject.registry && (
                      <div>
                        <dt className="text-xs font-semibold tracking-[0.14em] text-[var(--ink-muted)] uppercase">
                          Standard
                        </dt>
                        <dd className="mt-1 font-semibold text-[var(--ink)]">
                          {currentProject.registry}
                        </dd>
                      </div>
                    )}
                    {currentProject.volume && (
                      <div>
                        <dt className="text-xs font-semibold tracking-[0.14em] text-[var(--ink-muted)] uppercase">
                          Available
                        </dt>
                        <dd className="mt-1 font-semibold text-[var(--ink)]">
                          {currentProject.volume}
                        </dd>
                      </div>
                    )}
                  </dl>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">
                    Read the write-up
                    <Arrow />
                  </span>
                </div>
                {currentProject.image && (
                  <img
                    src={currentProject.image}
                    alt=""
                    className="w-full rounded-2xl object-cover"
                    loading="lazy"
                  />
                )}
              </Link>
            </Reveal>
          </Container>
        </Section>
      ) : (
        /* Before the first write-up ships. Deliberately says what is true rather
           than dressing the gap as content — the checklist below is the reason
           the page is still worth landing on. */
        <Section>
          <Container size="narrow">
            <Reveal>
              <div className="rounded-3xl border border-dashed border-[var(--line)] bg-[var(--surface-alt)] p-8 sm:p-10">
                <Eyebrow>Not yet published</Eyebrow>
                <h2 className="font-display text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
                  The first write-up is in preparation
                </h2>
                <p className="mt-4 leading-relaxed text-[var(--ink-muted)]">
                  It goes to the mailing list the day it is published, and it lands here at the same
                  time. Below is the standard it will be written against — the same questions every
                  project after it has to answer.
                </p>
                <SubscribeForm variant="compact" className="mt-7" />
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* The methodology. This is what makes the feature more than a newsletter:
          the criteria are published, so a reader can hold a write-up to them. */}
      <Section tone="alt">
        <Container size="wide">
          <Reveal>
            <Eyebrow>The standard</Eyebrow>
            <h2 className="font-display text-3xl leading-tight font-semibold text-[var(--ink)] sm:text-4xl">
              What every write-up has to answer
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--ink-muted)]">
              Offsets earn their reputation problem honestly — some projects genuinely do nothing.
              These are the six questions that separate the ones that do from the ones that don’t.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {vettingCriteria.map((criterion, i) => (
              <Reveal key={criterion.title} delay={(i % 3) * 80}>
                <article className="flex h-full flex-col rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7">
                  <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
                    {criterion.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-[var(--ink-muted)]">
                    {criterion.body}
                  </p>
                  <p className="mt-5 border-t border-[var(--line)] pt-4 text-sm leading-relaxed text-[var(--ink-muted)]">
                    <span className="font-semibold text-[var(--ink)]">What it catches: </span>
                    {criterion.failureMode}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {archivedProjects.length > 0 && (
        <Section>
          <Container size="wide">
            <Reveal>
              <Eyebrow>Archive</Eyebrow>
              <h2 className="font-display text-3xl leading-tight font-semibold text-[var(--ink)] sm:text-4xl">
                Previously
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {archivedProjects.map((project, i) => (
                <Reveal key={project.slug} delay={(i % 3) * 80}>
                  <Link
                    to={`/project-of-the-month/${project.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-forest-400 hover:shadow-xl hover:shadow-forest-950/8"
                  >
                    <p className="text-xs font-semibold tracking-[0.14em] text-forest-700 uppercase">
                      {formatMonth(project.month)}
                    </p>
                    <h3 className="font-display mt-3 text-xl font-semibold text-[var(--ink)]">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--ink-muted)]">
                      {project.category} · {project.location}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--ink-muted)]">
                      {project.summary}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">
                      Read it
                      <Arrow />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="deep" className="py-16 sm:py-20">
        <Container size="narrow" className="text-center">
          <Reveal>
            <Eyebrow>Stay with it</Eyebrow>
            <h2 className="font-display text-3xl leading-tight font-semibold text-white sm:text-4xl">
              Get each month’s project when it lands
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-forest-200">
              One email a month, one project, no chasing. Reply to any of them and you’re talking to
              a person.
            </p>
            {/* On the deep tone the form's own muted copy would sit dark-on-dark,
                so it gets a light panel to live in rather than a colour prop. */}
            <div className="mx-auto mt-8 max-w-lg rounded-3xl bg-[var(--surface)] p-6 text-left">
              <SubscribeForm variant="compact" />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
