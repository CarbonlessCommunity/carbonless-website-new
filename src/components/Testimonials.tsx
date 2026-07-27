import { Container, Eyebrow, Reveal, Section } from '@/components/ui'
import { testimonials } from '@/data/site'

/**
 * Named participants vouching for the work.
 *
 * Renders nothing while `testimonials` is empty — see the note beside that
 * array in `data/site.ts`. Same policy as the stats strip: an invented or
 * anonymised quote costs more credibility than a missing section does.
 */
export default function Testimonials() {
  if (!testimonials.length) return null

  return (
    <Section>
      <Container size="wide">
        <Eyebrow>In their words</Eyebrow>
        <div
          className={
            testimonials.length > 1
              ? 'mt-8 grid gap-6 lg:grid-cols-2'
              : 'mt-8 grid gap-6 lg:max-w-3xl'
          }
        >
          {testimonials.map((t, i) => (
            <Reveal key={`${t.org}-${t.name}`} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-3xl border border-[var(--line)] bg-[var(--surface-alt)] p-8 sm:p-10">
                <blockquote className="font-display flex-1 text-xl leading-relaxed text-[var(--ink)] sm:text-2xl">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-[var(--line)] pt-5 text-sm">
                  <span className="font-semibold text-[var(--ink)]">{t.name}</span>
                  <span className="mt-1 block text-[var(--ink-muted)]">
                    {t.role}, {t.org}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
