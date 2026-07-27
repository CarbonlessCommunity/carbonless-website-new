import { Container, cx, Reveal, Section } from '@/components/ui'
import { impactStats } from '@/data/site'

/**
 * The home page's proof strip.
 *
 * Shows whichever stats in `impactStats` have real values and drops the rest —
 * an unknown figure hides itself, not its neighbours. Placeholder numbers on a
 * home page are worse than no numbers, so nothing is ever invented to fill a
 * slot; see the note beside that array in `data/site.ts`.
 *
 * Below two stats the section stays hidden entirely: one number on its own
 * reads as an orphan rather than as proof.
 */
const MIN_STATS = 2

export default function StatsStrip() {
  const stats = impactStats.filter((s): s is typeof s & { value: string } => Boolean(s.value))
  if (stats.length < MIN_STATS) return null

  return (
    <Section tone="alt" className="py-14 sm:py-16">
      <Container size="wide">
        <dl
          className={cx(
            'grid gap-8 sm:grid-cols-2',
            stats.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
          )}
        >
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 70}>
              {/* `order` puts the number on top visually while the DOM keeps
                  label → value → note, which is what a screen reader wants. */}
              <div className="flex flex-col border-l-2 border-forest-400 pl-5">
                <dt className="order-2 mt-3 text-sm font-semibold text-[var(--ink)]">
                  {stat.label}
                </dt>
                <dd className="font-display order-1 text-4xl leading-none font-semibold text-[var(--ink)] sm:text-5xl">
                  {stat.value}
                </dd>
                {stat.note && (
                  <dd className="order-3 mt-1 text-sm leading-relaxed text-[var(--ink-muted)]">
                    {stat.note}
                  </dd>
                )}
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  )
}
