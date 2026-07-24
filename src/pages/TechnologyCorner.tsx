import PageHeader from '@/components/PageHeader'
import { Button, Container, Reveal, Section } from '@/components/ui'
import { usePageMeta } from '@/lib/hooks'

export default function TechnologyCorner() {
  usePageMeta(
    'Technology Corner',
    'Emerging low-carbon technology worth paying attention to.',
  )

  return (
    <>
      <PageHeader
        eyebrow="Technology Corner"
        title="Technology Corner"
        lede="A place for emerging low-carbon technology worth paying attention to."
      />

      <Section>
        <Container size="narrow">
          <Reveal>
            <div className="rounded-3xl border border-dashed border-[var(--line)] bg-[var(--surface-alt)] p-10 text-center sm:p-14">
              <p className="font-display text-2xl font-semibold text-[var(--ink)]">
                This page is still being written
              </p>
              <p className="mx-auto mt-4 max-w-md leading-relaxed text-[var(--ink-muted)]">
                In the meantime, the blog covers the technology questions we’re thinking about — and
                we’re always happy to talk through a specific one.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button to="/blog">Read the blog</Button>
                <Button to="/contact" variant="secondary">
                  Ask us something
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
