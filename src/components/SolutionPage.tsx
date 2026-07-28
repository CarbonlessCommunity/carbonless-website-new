import type { ReactNode } from 'react'
import { Link } from 'react-router'
import PageHeader from './PageHeader'
import { Arrow, Button, Container, Reveal, Section } from './ui'
import { getSolution, solutions } from '@/data/solutions'
import { usePageMeta } from '@/lib/hooks'

/**
 * Shared shell for every /solutions/* page: header pulled from the solutions
 * data, ported body copy as children, and a "next" rail at the bottom.
 */
export default function SolutionPage({
  slug,
  children,
  heroImage,
}: {
  slug: string
  children: ReactNode
  /** Override the header artwork; defaults to the solution's logo. */
  heroImage?: string | null
}) {
  const solution = getSolution(slug)!
  usePageMeta(solution.name, solution.summary)

  // Focus measures first: the rail is the one place a reader on a shelf page
  // gets pointed back at what the practice actually does.
  const others = solutions
    .filter((s) => s.slug !== slug)
    .sort((a, b) => Number(b.tier === 'focus') - Number(a.tier === 'focus'))
    .slice(0, 3)
  const headerImage = heroImage === null ? undefined : (heroImage ?? solution.logo ?? solution.image)

  return (
    <>
      <PageHeader
        eyebrow={solution.tier === 'focus' ? 'What we do' : 'Also available'}
        title={solution.name}
        lede={solution.lede}
        image={headerImage}
      >
        {solution.externalUrl && (
          <Button href={solution.externalUrl}>{solution.externalLabel ?? 'Visit site'}</Button>
        )}
        <Button to="/contact" variant="secondary">
          Ask us about it
        </Button>
      </PageHeader>

      <Section>
        <Container size="narrow">
          <Reveal>{children}</Reveal>
        </Container>
      </Section>

      {/* A reader who's sold shouldn't have to navigate sideways to act — the
          "other measures" rail below is for the ones who aren't. */}
      <Section tone="deep" className="py-14 sm:py-16">
        <Container size="narrow">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="font-display text-2xl font-semibold text-balance sm:text-3xl">
              Interested in {solution.name} for your organization?
            </h2>
            <p className="max-w-xl leading-relaxed opacity-80">
              Tell us roughly where you are today and we’ll walk you through what it would take.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button to="/contact">Talk to us</Button>
              <Button to="/project-of-the-month" variant="secondary">
                Project of the Month
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="alt" className="py-16 sm:py-20">
        <Container size="wide">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
            Other measures
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                to={`/solutions/${s.slug}`}
                className="group flex flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-forest-400"
              >
                <h3 className="font-display text-lg font-semibold text-[var(--ink)]">{s.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                  {s.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">
                  Learn more
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
