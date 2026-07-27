import { useEffect, type RefObject } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/** Focusable descendants in DOM order, skipping anything hidden. */
function focusableWithin(container: HTMLElement): HTMLElement[] {
  return [...container.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    // offsetParent is null for display:none subtrees; the fixed-position check
    // keeps genuinely visible fixed elements (like the header itself) in.
    (el) => el.offsetParent !== null || getComputedStyle(el).position === 'fixed',
  )
}

/**
 * Keeps Tab inside `ref` while `active`, and restores focus on close.
 *
 * Without this the mobile menu is a visual overlay only: a keyboard or screen
 * reader user tabs straight out of it into the page behind, which is still
 * scroll-locked and visually covered — they end up navigating something they
 * can't see.
 *
 * Focus moves to the first focusable element on open and returns to whatever
 * had it before (the toggle button) on close, so the keyboard doesn't get
 * dumped back at the top of the document.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active) return
    const container = ref.current
    if (!container) return

    const previous = document.activeElement as HTMLElement | null
    focusableWithin(container)[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      // Re-queried per keypress: the menu's contents change as sections expand.
      const items = focusableWithin(container)
      if (!items.length) return

      const first = items[0]!
      const last = items[items.length - 1]!
      const current = document.activeElement

      // Focus outside the container (or on the container itself) means
      // something moved it — pull it back to the appropriate edge.
      if (!container.contains(current)) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
        return
      }

      if (event.shiftKey && current === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && current === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      // Only restore if focus is still somewhere in the closing container —
      // if the user clicked a link, the new page should keep it.
      if (previous?.isConnected && container.contains(document.activeElement)) {
        previous.focus()
      }
    }
  }, [ref, active])
}
