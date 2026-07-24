import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav, site } from '@/data/site'
import { Container, cx } from './ui'
import { useTheme } from '@/lib/hooks'

function ThemeToggle({ overHero }: { overHero?: boolean }) {
  const { theme, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={cx(
        'grid h-9 w-9 place-items-center rounded-full border transition-colors',
        overHero
          ? 'border-white/25 text-white/80 hover:border-white/50 hover:text-white'
          : 'border-[var(--line)] text-[var(--ink-muted)] hover:border-forest-400 hover:text-forest-600 dark:hover:text-forest-300',
      )}
    >
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      )}
    </button>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close every menu when the route changes
  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpenMenu(null)
      setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // The home hero runs under the header, so at the top of that page the bar
  // sits on dark artwork and has to invert regardless of the active theme.
  const overHero = location.pathname === '/' && !scrolled && !mobileOpen

  const idle = overHero ? 'text-white/75 hover:text-white' : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
  const active = overHero ? 'text-white' : 'text-forest-700 dark:text-forest-300'

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cx('rounded-full px-3 py-2 text-sm font-medium transition-colors', isActive ? active : idle)

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || mobileOpen
          ? 'border-b border-[var(--line)] bg-[var(--surface)]/85 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <Container size="wide">
        <div className="flex h-18 items-center justify-between gap-4 py-3">
          <Link to="/" className="group flex items-center gap-2.5">
            <img src="/images/Logo.png" alt="" className="h-9 w-9 object-contain" />
            <span
              className={cx(
                'font-display text-[1.05rem] leading-tight font-semibold tracking-tight',
                overHero ? 'text-white' : 'text-[var(--ink)]',
              )}
            >
              Carbonless
              <span
                className={cx(
                  'block text-[0.72rem] font-medium tracking-[0.16em] uppercase',
                  overHero ? 'text-forest-300' : 'text-forest-600 dark:text-forest-400',
                )}
              >
                Community
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    type="button"
                    aria-expanded={openMenu === item.label}
                    onClick={() => setOpenMenu((m) => (m === item.label ? null : item.label))}
                    className={cx(
                      'flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors',
                      location.pathname.startsWith(item.to ?? '\0') || openMenu === item.label
                        ? active
                        : idle,
                    )}
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 12 12"
                      className={cx(
                        'h-2.5 w-2.5 transition-transform duration-200',
                        openMenu === item.label && 'rotate-180',
                      )}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    >
                      <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
                    </svg>
                  </button>

                  {openMenu === item.label && (
                    <div className="absolute top-full left-1/2 w-[26rem] -translate-x-1/2 pt-2">
                      <div className="reveal-in grid gap-0.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2 shadow-xl shadow-forest-950/10 dark:shadow-black/40">
                        {item.children.map((child) => (
                          <Link
                            key={child.to + child.label}
                            to={child.to}
                            className="group rounded-xl px-3.5 py-2.5 transition-colors hover:bg-[var(--surface-alt)]"
                          >
                            <span className="block text-sm font-semibold text-[var(--ink)]">
                              {child.label}
                            </span>
                            {child.blurb && (
                              <span className="mt-0.5 block text-xs leading-snug text-[var(--ink-muted)]">
                                {child.blurb}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink key={item.label} to={item.to!} className={linkClass}>
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle overHero={overHero} />
            <Link
              to="/contact"
              className={cx(
                'hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-colors sm:inline-flex',
                overHero
                  ? 'bg-white text-forest-900 hover:bg-forest-100'
                  : 'bg-forest-700 text-white hover:bg-forest-800 dark:bg-forest-500 dark:text-forest-950 dark:hover:bg-forest-400',
              )}
            >
              Get in touch
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
              className={cx(
                'grid h-9 w-9 place-items-center rounded-full border lg:hidden',
                overHero ? 'border-white/25 text-white' : 'border-[var(--line)] text-[var(--ink)]',
              )}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                {mobileOpen ? <path d="m5 5 10 10M15 5 5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="reveal-in max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-[var(--line)] bg-[var(--surface)] lg:hidden">
          <Container size="wide">
            <nav className="flex flex-col gap-1 py-6">
              <NavLink to="/" className="rounded-xl px-3 py-2.5 text-base font-semibold text-[var(--ink)]">
                Home
              </NavLink>
              {nav.map((item) => (
                <div key={item.label}>
                  {item.to ? (
                    <NavLink to={item.to} className="block rounded-xl px-3 py-2.5 text-base font-semibold text-[var(--ink)]">
                      {item.label}
                    </NavLink>
                  ) : (
                    <p className="px-3 py-2.5 text-base font-semibold text-[var(--ink)]">{item.label}</p>
                  )}
                  {item.children && (
                    <div className="mb-2 ml-3 flex flex-col border-l border-[var(--line)] pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.to + child.label}
                          to={child.to}
                          className="py-2 text-sm text-[var(--ink-muted)] transition-colors hover:text-forest-600"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                className="mt-3 rounded-full bg-forest-700 px-5 py-3 text-center text-sm font-semibold text-white dark:bg-forest-500 dark:text-forest-950"
              >
                Get in touch
              </Link>
              <a
                href={site.blogUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="px-3 py-2.5 text-sm text-[var(--ink-muted)]"
              >
                Original blog on WordPress ↗
              </a>
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
