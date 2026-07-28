import { Link, useParams } from 'react-router'
import NotFound from '@/pages/NotFound'
import PageHeader from '@/components/PageHeader'
import SubscribeForm from '@/components/SubscribeForm'
import { Arrow, Button, Container, Eyebrow, Reveal, Section } from '@/components/ui'
import { formatMonth, getProject, projectsOfTheMonth } from '@/data/projects'
import type { MonthlyProject } from '@/data/projects'
import { usePageMeta } from '@/lib/hooks'

/**
 * One month's write-up.
 *
 * Every section below renders only if the data carries it, so a project can be
 * published with what is sourced and gain the rest later — except the layout's
 * shape, which is fixed on purpose. A reader who has seen one of these should
 * know where to find the additionality argument in the next one.
 */
export default function ProjectDetail() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined

  // Rendering the write-up in its own component keeps `usePageMeta` out of a
  // branch — hooks can't sit behind the not-found return.
  if (!project) return <NotFound />
  return <ProjectWriteUp project={project} />
}

function ProjectWriteUp({ project }: { project: MonthlyProject }) {
  usePageMeta(`${project.name} — ${formatMonth(project.month)}`, project.summary)

  const others = projectsOfTheMonth.filter((p) => p.slug !== project.slug).slice(0, 3)

  return (
    <>
      <PageHeader
        eyebrow={`Project of the Month · ${formatMonth(project.month)}`}
        title={project.name}
        lede={project.summary}
        image={project.image}
      >
        {project.externalUrl && (
          <Button href={project.externalUrl}>{project.externalLabel ?? 'Project listing'}</Button>
        )}
        <Button to="/contact" variant="secondary">
          Ask about this project
        </Button>
      </PageHeader>

      <Section>
        <Container size="narrow">
          <Reveal>
            <dl className="grid gap-6 rounded-3xl border border-[var(--line)] bg-[var(--surface-alt)] p-7 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Type', value: project.category },
                { label: 'Location', value: project.location },
                { label: 'Standard', value: project.registry },
                { label: 'Available', value: project.volume },
              ]
                .filter((field) => field.value)
                .map((field) => (
                  <div key={field.label}>
                    <dt className="text-xs font-semibold tracking-[0.14em] text-[var(--ink-muted)] uppercase">
                      {field.label}
                    </dt>
                    <dd className="mt-1.5 font-semibold text-[var(--ink)]">{field.value}</dd>
                  </div>
                ))}
            </dl>

            {project.story && project.story.length > 0 && (
              <div className="rich-text mt-12">
                {project.story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            )}

            {project.additionality && (
              <div className="mt-12 rounded-3xl border-l-4 border-forest-500 bg-[var(--surface-alt)] p-8">
                <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                  Would this have happened anyway?
                </h2>
                <p className="mt-4 leading-relaxed text-[var(--ink-muted)]">
                  {project.additionality}
                </p>
              </div>
            )}

            {project.coBenefits && project.coBenefits.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                  What else it does
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {project.coBenefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4 leading-relaxed text-[var(--ink-muted)]"
                    >
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* The section that makes the feature worth reading. A write-up
                without it is a brochure. */}
            {project.scrutiny && (
              <div className="mt-12 rounded-3xl border border-[var(--line)] p-8">
                <Eyebrow>The objection</Eyebrow>
                <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                  What a sceptic would push on
                </h2>
                <p className="mt-4 leading-relaxed text-[var(--ink-muted)]">{project.scrutiny}</p>
                <Link
                  to="/project-of-the-month"
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest-700"
                >
                  The checklist every project is held to
                  <Arrow />
                </Link>
              </div>
            )}
          </Reveal>
        </Container>
      </Section>

      <Section tone="deep" className="py-14 sm:py-16">
        <Container size="narrow">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="font-display text-2xl font-semibold text-balance sm:text-3xl">
              Interested in tonnes from this project?
            </h2>
            <p className="max-w-xl leading-relaxed opacity-80">
              Tell us roughly what your inventory looks like and what you’re offsetting today. We’ll
              tell you what this project can and can’t cover.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button to="/contact">Talk to us</Button>
              <Button to="/recs-vs-offsets" variant="secondary">
                Compare with RECs
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="alt" className="py-16 sm:py-20">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                {others.length ? 'Other months' : 'Every month, a new one'}
              </h2>
              {others.length ? (
                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {others.map((other) => (
                    <Link
                      key={other.slug}
                      to={`/project-of-the-month/${other.slug}`}
                      className="group flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-forest-400"
                    >
                      <p className="text-xs font-semibold tracking-[0.14em] text-forest-700 uppercase">
                        {formatMonth(other.month)}
                      </p>
                      <h3 className="font-display mt-2 text-lg font-semibold text-[var(--ink)]">
                        {other.name}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                        {other.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-4 max-w-xl leading-relaxed text-[var(--ink-muted)]">
                  This is the first one. There will be another next month, and the archive builds
                  from here.
                </p>
              )}
            </div>
            <SubscribeForm variant="compact" className="lg:pt-2" />
          </div>
        </Container>
      </Section>
    </>
  )
}
