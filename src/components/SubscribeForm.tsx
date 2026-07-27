import { useId } from 'react'
import { cx } from './ui'
import { honeypotProps, useFormspree } from '@/lib/useFormspree'

/**
 * A one-field alternative to the contact form.
 *
 * The site's actual ask — gather 100 committed people at your organization — is
 * a large commitment, and until now the only action anywhere was the full
 * contact form. This is the step in front of it: leave an address, hear from us
 * occasionally, decide later.
 *
 * Uses a separate form id from the contact form so list signups don't land in
 * the same inbox thread as inquiries.
 */
const NEWSLETTER_ID = import.meta.env.VITE_FORMSPREE_NEWSLETTER_ID as string | undefined

export default function SubscribeForm({
  className,
  variant = 'default',
}: {
  className?: string
  /** `compact` drops the heading — for the footer, where the column header says it. */
  variant?: 'default' | 'compact'
}) {
  // The footer renders one of these on every page, so a second instance on any
  // given page would otherwise duplicate the input id and break both labels.
  const emailId = useId()
  const { status, handleSubmit, isConfigured, fallbackEmail } = useFormspree({
    formId: NEWSLETTER_ID,
    mailSubject: 'Newsletter signup',
    mailBody: (data) => `Please add ${data.get('email')} to the newsletter list.`,
  })

  if (status === 'success') {
    return (
      <p
        className={cx('text-sm leading-relaxed text-[var(--ink-muted)]', className)}
        role="status"
      >
        {isConfigured
          ? 'You’re on the list — thanks.'
          : 'Send the message your mail client just opened and we’ll add you.'}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {variant === 'default' && (
        <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
          Occasional updates
        </h2>
      )}
      <p
        className={cx(
          'text-sm leading-relaxed text-[var(--ink-muted)]',
          variant === 'default' && 'mt-2',
        )}
      >
        What we’re seeing in energy markets and efficiency. No more than monthly.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <label className="sr-only" htmlFor={emailId}>
          Email address
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-[var(--ink)] transition-colors placeholder:text-[var(--ink-muted)]/70 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/25 focus:outline-none"
        />

        {/* Honeypot — hidden from people, tempting to bots. */}
        <input {...honeypotProps} />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-forest-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-forest-800 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? 'Adding…' : 'Subscribe'}
        </button>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          That didn’t send. Email us at{' '}
          <a className="underline underline-offset-4" href={`mailto:${fallbackEmail}`}>
            {fallbackEmail}
          </a>{' '}
          and we’ll add you.
        </p>
      )}
    </form>
  )
}
