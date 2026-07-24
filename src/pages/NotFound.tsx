import { Button, Container, Section } from '@/components/ui'
import { usePageMeta } from '@/lib/hooks'

export default function NotFound() {
  usePageMeta('Page not found')

  return (
    <Section className="py-32">
      <Container size="narrow" className="text-center">
        <p className="font-display text-7xl font-semibold text-forest-300 dark:text-forest-700">
          404
        </p>
        <h1 className="font-display mt-6 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
          We couldn’t find that page
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-[var(--ink-muted)]">
          The site was recently rebuilt, so an old bookmark may no longer line up. Try the solutions
          index or head home.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button to="/">Back home</Button>
          <Button to="/solutions" variant="secondary">
            Browse solutions
          </Button>
        </div>
      </Container>
    </Section>
  )
}
