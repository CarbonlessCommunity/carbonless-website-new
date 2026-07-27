import { cx } from './ui'
import { honeypotProps, useFormspree } from '@/lib/useFormspree'

/**
 * Lead capture for a static host. Posts to Formspree when
 * `VITE_FORMSPREE_ID` is set, and falls back to a pre-filled `mailto:`
 * otherwise — see `lib/useFormspree.ts` for why both modes exist.
 */
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined

const SIZES = [
  'Under 100 people',
  '100 – 500',
  '500 – 2,000',
  '2,000 – 10,000',
  'More than 10,000',
]

const field =
  'w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-[var(--ink)] transition-colors placeholder:text-[var(--ink-muted)]/70 focus:border-forest-500 focus:ring-2 focus:ring-forest-500/25 focus:outline-none'
const label = 'block text-xs font-semibold tracking-[0.14em] text-[var(--ink-muted)] uppercase'

export default function ContactForm({ className }: { className?: string }) {
  const { status, handleSubmit, isConfigured, fallbackEmail } = useFormspree({
    formId: FORMSPREE_ID,
    mailSubject: 'Carbonless Community enquiry',
    mailBody: (data) =>
      [
        `Name: ${data.get('name')}`,
        `Email: ${data.get('email')}`,
        `Organization: ${data.get('organization')}`,
        `Size: ${data.get('size')}`,
        '',
        String(data.get('message') ?? ''),
      ].join('\n'),
  })

  if (status === 'success') {
    return (
      <div
        className={cx(
          'rounded-3xl border border-forest-400/50 bg-[var(--surface-alt)] p-10 text-center',
          className,
        )}
      >
        <h3 className="font-display text-2xl font-semibold text-[var(--ink)]">Thanks — got it</h3>
        <p className="mx-auto mt-3 max-w-md text-[var(--ink-muted)]">
          {isConfigured
            ? 'We’ll come back to you within a couple of working days.'
            : 'Send the message your mail client just opened and we’ll come back to you within a couple of working days.'}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cx(
        'rounded-3xl border border-[var(--line)] bg-[var(--surface-alt)] p-8 sm:p-10',
        className,
      )}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="cf-name">
            Your name
          </label>
          <input id="cf-name" name="name" required autoComplete="name" className={cx(field, 'mt-2')} />
        </div>
        <div>
          <label className={label} htmlFor="cf-email">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={cx(field, 'mt-2')}
          />
        </div>
        <div>
          <label className={label} htmlFor="cf-org">
            Organization
          </label>
          <input
            id="cf-org"
            name="organization"
            autoComplete="organization"
            className={cx(field, 'mt-2')}
          />
        </div>
        <div>
          <label className={label} htmlFor="cf-size">
            Roughly how many people?
          </label>
          <select id="cf-size" name="size" defaultValue="" className={cx(field, 'mt-2')}>
            <option value="" disabled>
              Select…
            </option>
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className={label} htmlFor="cf-message">
          What are you trying to do?
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          placeholder="Where you are today, and what you’d like to reach."
          className={cx(field, 'mt-2 resize-y')}
        />
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <input {...honeypotProps} />

      {status === 'error' && (
        <p role="alert" className="mt-5 text-sm text-red-600">
          That didn’t send. Email us directly at{' '}
          <a className="underline underline-offset-4" href={`mailto:${fallbackEmail}`}>
            {fallbackEmail}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-forest-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-forest-800 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>

      <p className="mt-4 text-xs text-[var(--ink-muted)]">
        We’ll only use this to reply. No list, no sharing.
      </p>
    </form>
  )
}
