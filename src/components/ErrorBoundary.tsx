import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button, Container, Section } from './ui'

/**
 * Catches render errors below it so one broken page doesn't blank the site.
 *
 * Wrapped around `<Outlet />` rather than the whole app, so the header, nav and
 * footer survive and the visitor still has somewhere to go. React has no hook
 * equivalent for this — it has to be a class.
 */
export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Page render failed:', error, info.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <Section className="py-28">
        <Container size="narrow" className="text-center">
          <p className="font-display text-6xl font-semibold text-forest-300">
            Oops
          </p>
          <h1 className="font-display mt-6 text-3xl font-semibold text-[var(--ink)]">
            This page ran into a problem
          </h1>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-[var(--ink-muted)]">
            Something on our end broke while rendering. Reloading usually clears it.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button onClick={() => window.location.reload()}>Reload the page</Button>
            <Button to="/" variant="secondary">
              Back to home
            </Button>
          </div>
        </Container>
      </Section>
    )
  }
}
