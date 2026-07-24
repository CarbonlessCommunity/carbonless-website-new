import PageHeader from '@/components/PageHeader'
import { Container, Reveal, Section } from '@/components/ui'
import { usePageMeta } from '@/lib/hooks'

const newsletters = [{ label: 'October 2020', file: '/oct2020.pdf', current: true }]

export default function Newsletters() {
  usePageMeta('Newsletters', 'Periodic updates from the Carbonless Community team.')

  const current = newsletters.find((n) => n.current)!
  const past = newsletters.filter((n) => !n.current)

  return (
    <>
      <PageHeader
        eyebrow="Newsletters"
        title="Updates from the team"
        lede="Periodic notes on what we’re seeing in energy markets, carbon accounting and efficiency."
      />

      <Section>
        <Container size="wide">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                Current — {current.label}
              </h2>
              <a
                href={current.file}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm font-semibold text-forest-700 underline underline-offset-4 dark:text-forest-300"
              >
                Open as PDF ↗
              </a>
            </div>
            <div className="mt-6 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface-alt)]">
              <object
                data={`${current.file}#toolbar=0`}
                type="application/pdf"
                className="h-[36rem] w-full"
                aria-label={`Newsletter — ${current.label}`}
              >
                <div className="p-10 text-center">
                  <p className="text-[var(--ink-muted)]">
                    Your browser can’t display PDFs inline.
                  </p>
                  <a
                    href={current.file}
                    className="mt-4 inline-block font-semibold text-forest-700 underline underline-offset-4 dark:text-forest-300"
                  >
                    Download the {current.label} newsletter
                  </a>
                </div>
              </object>
            </div>
          </Reveal>

          {past.length > 0 && (
            <Reveal delay={100} className="mt-16">
              <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                Past newsletters
              </h2>
              <ul className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {past.map((n) => (
                  <li key={n.file}>
                    <a
                      href={n.file}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center justify-between py-5 text-[var(--ink)] transition-colors hover:text-forest-600"
                    >
                      <span className="font-medium">{n.label}</span>
                      <span className="text-sm text-[var(--ink-muted)]">PDF ↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </Container>
      </Section>
    </>
  )
}
