import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router'

export const cx = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(' ')

export function Container({
  children,
  className,
  size = 'default',
}: {
  children: ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide'
}) {
  const width =
    size === 'narrow' ? 'max-w-3xl' : size === 'wide' ? 'max-w-7xl' : 'max-w-6xl'
  return <div className={cx('mx-auto w-full px-5 sm:px-8', width, className)}>{children}</div>
}

export function Section({
  children,
  className,
  tone = 'default',
  id,
}: {
  children: ReactNode
  className?: string
  tone?: 'default' | 'alt' | 'deep'
  id?: string
}) {
  const tones = {
    default: '',
    alt: 'bg-[var(--surface-alt)]',
    deep: 'bg-forest-950 text-forest-50',
  }
  // Tailwind resolves conflicting utilities by their order in the generated
  // stylesheet, not by their order in the class attribute — so appending a
  // caller's `py-14` after the default `sm:py-28` did nothing, and every
  // section that asked for tighter spacing silently rendered at the default.
  // Drop the default when the caller has stated its own vertical padding.
  const ownsPadding = /(^|\s)(py|pt|pb)-/.test(className ?? '')
  return (
    <section id={id} className={cx(!ownsPadding && 'py-20 sm:py-28', tones[tone], className)}>
      {children}
    </section>
  )
}

/**
 * Fades and lifts its children as they scroll into view, via a CSS scroll
 * timeline. Purely additive: without support the children just render normally.
 * `delay` staggers siblings by lengthening the animation range slightly.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <div
      className={cx('reveal', className)}
      style={delay ? ({ '--reveal-shift': `${delay / 12}%` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-forest-600 uppercase">
      {children}
    </p>
  )
}

type ButtonProps = {
  children: ReactNode
  to?: string
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

const buttonStyles = {
  base: 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ease-[var(--ease-out-soft)] active:scale-[0.98]',
  primary:
    'bg-forest-700 text-white shadow-sm hover:bg-forest-800 hover:shadow-md',
  secondary:
    'border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-forest-400 hover:bg-forest-50',
  ghost:
    'text-forest-700 hover:text-forest-900 px-0',
}

export function Button({
  children,
  to,
  href,
  variant = 'primary',
  className,
  onClick,
  type = 'button',
}: ButtonProps) {
  const cls = cx(buttonStyles.base, buttonStyles[variant], className)
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
        <Arrow />
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer noopener">
        {children}
        <ExternalIcon />
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  )
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cx('h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  )
}

export function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V10M9.5 2H14v4.5M14 2 7.5 8.5" />
    </svg>
  )
}

/** Pull quote used on the home, about and offsets pages. */
export function Quote({
  children,
  attribution,
  role,
  tone = 'default',
}: {
  children: ReactNode
  attribution: string
  role?: string
  tone?: 'default' | 'deep'
}) {
  return (
    <figure
      className={cx(
        'relative rounded-3xl border px-8 py-10 sm:px-12 sm:py-14',
        tone === 'deep'
          ? 'border-forest-800 bg-forest-900/60'
          : 'border-[var(--line)] bg-[var(--surface-alt)]',
      )}
    >
      <span
        aria-hidden="true"
        className="font-display absolute top-2 left-6 text-7xl leading-none text-forest-300/50 select-none"
      >
        &ldquo;
      </span>
      <blockquote
        className={cx(
          'font-display relative text-xl leading-relaxed italic sm:text-2xl',
          tone === 'deep' ? 'text-forest-50' : 'text-[var(--ink)]',
        )}
      >
        {children}
      </blockquote>
      <figcaption
        className={cx(
          'mt-6 text-sm',
          tone === 'deep' ? 'text-forest-300' : 'text-[var(--ink-muted)]',
        )}
      >
        <span className="font-semibold">{attribution}</span>
        {role && <span className="opacity-80"> — {role}</span>}
      </figcaption>
    </figure>
  )
}
