import { asset } from '@/lib/asset'
import { Link } from 'react-router'
import { contacts, nav, site } from '@/data/site'
import SubscribeForm from './SubscribeForm'
import { Container } from './ui'

export default function Footer() {
  const year = new Date().getFullYear()
  const primary = contacts[0]

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface-alt)]">
      <Container size="wide">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr] lg:gap-16">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img src={asset('/images/Logo.webp')} alt="" className="h-10 w-10 object-contain" />
              <span className="font-display text-lg font-semibold text-[var(--ink)]">
                Carbonless Community
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--ink-muted)]">
              {site.tagline}
            </p>
            <address className="mt-6 space-y-1 text-sm not-italic text-[var(--ink-muted)]">
              <p className="font-semibold text-[var(--ink)]">{primary.name}</p>
              <p>
                <a href={primary.phoneHref} className="transition-colors hover:text-forest-600">
                  {primary.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${primary.email}`}
                  className="transition-colors hover:text-forest-600"
                >
                  {primary.email}
                </a>
              </p>
            </address>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {nav.map((group) => (
              <div key={group.label}>
                <h3 className="font-sans text-xs font-semibold tracking-[0.16em] text-[var(--ink)] uppercase">
                  {group.label}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.children ? (
                    group.children.map((child) => (
                      <li key={child.to + child.label}>
                        <Link
                          to={child.to}
                          className="text-sm text-[var(--ink-muted)] transition-colors hover:text-forest-600"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>
                      <Link
                        to={group.to!}
                        className="text-sm text-[var(--ink-muted)] transition-colors hover:text-forest-600"
                      >
                        Our story
                      </Link>
                    </li>
                  )}
                  {group.label === 'About' && (
                    <li>
                      <Link
                        to="/contact"
                        className="text-sm text-[var(--ink-muted)] transition-colors hover:text-forest-600"
                      >
                        Contact
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[var(--line)] py-10">
          <h3 className="font-sans text-xs font-semibold tracking-[0.16em] text-[var(--ink)] uppercase">
            Stay in touch
          </h3>
          <SubscribeForm variant="compact" className="mt-4 max-w-lg" />
        </div>

        <div className="flex flex-col gap-3 border-t border-[var(--line)] py-6 text-sm text-[var(--ink-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Carbonless Community, Inc.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="self-start transition-colors hover:text-forest-600 sm:self-auto"
          >
            Back to top ↑
          </button>
        </div>
      </Container>
    </footer>
  )
}
