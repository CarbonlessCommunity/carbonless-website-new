import { Link } from 'react-router'
import PageHeader from '@/components/PageHeader'
import { Arrow, Container, Eyebrow, LogoPlate, Reveal, Section } from '@/components/ui'
import { focusSolutions, otherSolutions } from '@/data/solutions'
import { usePageMeta } from '@/lib/hooks'

/**
 * The shelf.
 *
 * This page used to be the site's centre of gravity: eight measures, flat, in no
 * particular order. It now runs the other way round — two measures we are
 * actually building on, then everything we can still arrange, with the reasoning
 * for the split stated rather than implied.
 */
export default function SolutionsIndex() {
  usePageMeta(
    'Other Measures',
    'Community solar, reverse energy auctions, efficient appliances, fleet conversions and building controls — measures we still arrange for clients who want them.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Also available"
        title="Everything else we can arrange"
        lede="Carbon offsets are what we build on. These are real measures we still put in place for clients who want them — they are simply not what we spend the week chasing."
      />

      <Section>
        <Container size="wide">
          <Reveal>
            <Eyebrow>What we lead with</Eyebrow>
            <h2 className="font-display text-3xl leading-tight font-semibold text-[var(--ink)]">
              The two that get our attention
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {focusSolutions.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <Link
                  to={`/solutions/${s.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-forest-300 bg-[var(--surface)] p-8 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-forest-500 hover:shadow-xl hover:shadow-forest-950/8"
                >
                  <LogoPlate src={s.logo ?? s.image} name={s.name} className="mb-7 h-14" />
                  <h3 className="font-display text-2xl leading-snug font-semibold text-[var(--ink)]">
                    {s.name}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-[var(--ink-muted)]">{s.summary}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">
                    Learn more
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="alt">
        <Container size="wide">
          <Reveal>
            <Eyebrow>Still on the shelf</Eyebrow>
            <h2 className="font-display text-3xl leading-tight font-semibold text-[var(--ink)]">
              Measures we’ll gladly put in place
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--ink-muted)]">
              Ask and we’ll arrange any of these. What we no longer do is build the business on
              them: retail electricity and gas brokering has almost no barrier to entry, so growing
              it means cold-calling buyers who are already fielding a dozen calls a week at a lower
              price — and rooftop solar lost enough of its tax treatment that the pool of genuinely
              good fits shrank with it. Neither is a good use of anyone’s afternoon.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {otherSolutions.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 70}>
                <Link
                  to={`/solutions/${s.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-7 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-forest-400 hover:shadow-lg"
                >
                  <LogoPlate src={s.logo ?? s.image} name={s.name} className="mb-6 h-12" />
                  <h3 className="font-display text-xl leading-snug font-semibold text-[var(--ink)]">
                    {s.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--ink-muted)]">
                    {s.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">
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
