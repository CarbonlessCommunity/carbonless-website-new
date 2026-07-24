import { Link } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import { Arrow, Container, Reveal, Section } from '@/components/ui'
import { solutions } from '@/data/solutions'
import { usePageMeta } from '@/lib/hooks'

export default function SolutionsIndex() {
  usePageMeta(
    'Solutions',
    'Carbon offsets, community solar, reverse energy auctions, efficient appliances and vehicles — the measures we help organizations put in place.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="A portfolio of measures, not a silver bullet"
        lede="Some of these have attractive project economics. Some don’t. Together they build a plan that gets your organization where it needs to go."
      />

      <Section>
        <Container size="wide">
          <div className="grid gap-6 md:grid-cols-2">
            {solutions.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 2) * 80}>
                <Link
                  to={`/solutions/${s.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-forest-400 hover:shadow-xl hover:shadow-forest-950/8"
                >
                  {/* Partner logos are a mix of transparent and white-matted
                      files — the plate keeps them legible in dark mode. */}
                  <div className="mb-7 flex h-14 w-fit items-center rounded-xl bg-white px-3">
                    <img
                      src={s.logo ?? s.image}
                      alt=""
                      className="max-h-10 max-w-[9rem] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h2 className="font-display text-2xl leading-snug font-semibold text-[var(--ink)]">
                    {s.name}
                  </h2>
                  <p className="mt-3 flex-1 leading-relaxed text-[var(--ink-muted)]">{s.summary}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest-700 dark:text-forest-300">
                    Learn more
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
