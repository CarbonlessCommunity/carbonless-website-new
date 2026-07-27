import PageHeader from '@/components/PageHeader'
import { Button, Container, Reveal, Section } from '@/components/ui'
import { currentNewsletter, pastNewsletters, type Newsletter } from '@/data/newsletters'
import { usePageMeta } from '@/lib/hooks'
import { formatDate } from '@/lib/wordpress'

function IssueRow({ issue }: { issue: Newsletter }) {
  return (
    <li>
      <a
        href={issue.file}
        target="_blank"
        rel="noreferrer noopener"
        className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5 transition-colors hover:text-forest-600 dark:hover:text-forest-300"
      >
        <span className="font-medium text-[var(--ink)] group-hover:text-inherit">
          {issue.title}
        </span>
        {issue.summary && (
          <span className="w-full text-sm leading-relaxed text-[var(--ink-muted)]">
            {issue.summary}
          </span>
        )}
        <span className="text-sm whitespace-nowrap text-[var(--ink-muted)]">Download PDF ↗</span>
      </a>
    </li>
  )
}

export default function Newsletters() {
  usePageMeta('Newsletters', 'Periodic updates from the Carbonless Community team.')

  const current = currentNewsletter()
  const past = pastNewsletters()

  return (
    <>
      <PageHeader
        eyebrow="Newsletters"
        title="Updates from the team"
        lede="Periodic notes on what we’re seeing in energy markets, carbon accounting and efficiency."
      />

      <Section>
        <Container size="wide">
          {!current ? (
            <Reveal>
              <div className="rounded-3xl border border-dashed border-[var(--line)] bg-[var(--surface-alt)] p-10 text-center sm:p-14">
                <p className="font-display text-2xl font-semibold text-[var(--ink)]">
                  No issues published yet
                </p>
                <p className="mx-auto mt-4 max-w-md leading-relaxed text-[var(--ink-muted)]">
                  The blog is where we’re writing in the meantime.
                </p>
                <div className="mt-8 flex justify-center">
                  <Button to="/blog">Read the blog</Button>
                </div>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
                    Latest — {current.title}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--ink-muted)]">
                    {formatDate(current.date)}
                  </p>
                </div>
                {/* The download link is the primary path, not a fallback: inline
                    PDF embedding is unreliable-to-broken on mobile browsers, and
                    the <object> below never renders there at all. */}
                <a
                  href={current.file}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm font-semibold text-forest-700 underline underline-offset-4 dark:text-forest-300"
                >
                  Download PDF ↗
                </a>
              </div>

              {current.summary && (
                <p className="mt-4 max-w-2xl leading-relaxed text-[var(--ink-muted)]">
                  {current.summary}
                </p>
              )}

              {/* Preview only where it works — hidden below lg, where the
                  download link above is the whole interaction. */}
              <div className="mt-6 hidden overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface-alt)] lg:block">
                <object
                  data={`${current.file}#toolbar=0`}
                  type="application/pdf"
                  className="h-[36rem] w-full"
                  aria-label={`Newsletter — ${current.title}`}
                >
                  <div className="p-10 text-center">
                    <p className="text-[var(--ink-muted)]">
                      Your browser can’t display PDFs inline.
                    </p>
                    <a
                      href={current.file}
                      className="mt-4 inline-block font-semibold text-forest-700 underline underline-offset-4 dark:text-forest-300"
                    >
                      Download the {current.title} newsletter
                    </a>
                  </div>
                </object>
              </div>
            </Reveal>
          )}

          {past.length > 0 && (
            <Reveal delay={100} className="mt-16">
              <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">Archive</h2>
              <ul className="mt-6 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {past.map((issue) => (
                  <IssueRow key={issue.file} issue={issue} />
                ))}
              </ul>
            </Reveal>
          )}
        </Container>
      </Section>
    </>
  )
}
