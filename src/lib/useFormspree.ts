import { useState } from 'react'
import { contacts } from '@/data/site'

/**
 * The submit/state machine shared by the contact and subscribe forms.
 *
 * Lead capture on a static host has no server to post to, so each form has two
 * modes. Given a Formspree form id, submissions POST there and Formspree emails
 * them on. Without one, the form still works: it composes a pre-filled `mailto:`
 * and hands off to the visitor's mail client. That fallback is strictly worse —
 * it needs a configured mail app, which many phones don't have, and nothing is
 * recorded server-side — so treat it as the stopgap, not the destination.
 *
 * Both forms also carry a honeypot: a field no human sees, so anything that
 * fills it is a bot. Those submissions report success without sending, so the
 * bot doesn't retry with a different shape.
 */
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

/** The field name of the honeypot input. Render it via `honeypotProps`. */
export const HONEYPOT_FIELD = 'website'

/** Spread onto an `<input>` to add the honeypot; hidden from people, not from bots. */
export const honeypotProps = {
  type: 'text',
  name: HONEYPOT_FIELD,
  tabIndex: -1,
  autoComplete: 'off',
  'aria-hidden': true,
  className: 'absolute h-0 w-0 overflow-hidden opacity-0',
} as const

export type UseFormspreeOptions = {
  /** Formspree form id. Undefined switches the form to its `mailto:` fallback. */
  formId: string | undefined
  /** Subject line for the `mailto:` fallback. */
  mailSubject: string
  /** Builds the `mailto:` body from the submitted fields. */
  mailBody: (data: FormData) => string
}

export function useFormspree({ formId, mailSubject, mailBody }: UseFormspreeOptions) {
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    if (data.get(HONEYPOT_FIELD)) {
      setStatus('success')
      return
    }

    if (!formId) {
      const to = contacts[0].email
      window.location.href =
        `mailto:${to}?subject=${encodeURIComponent(mailSubject)}` +
        `&body=${encodeURIComponent(mailBody(data))}`
      setStatus('success')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return {
    status,
    handleSubmit,
    /** True when posting to Formspree; false when the `mailto:` fallback is in play. */
    isConfigured: Boolean(formId),
    /** Where to point people when sending fails. */
    fallbackEmail: contacts[0].email,
  }
}
