import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
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

  const others = solutions.filter((s) => s.slug !== slug).slice(0, 3)
  const headerImage = heroImage === null ? undefined : (heroImage ?? solution.logo ?? solution.image)

  return (
    <>
      <PageHeader
        eyebrow="Solutions"
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
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest-700 dark:text-forest-300">
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
