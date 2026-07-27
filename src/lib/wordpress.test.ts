import { describe, expect, it } from 'vitest'
import { decodeHtml, formatDate, readingTime, sanitize } from './wordpress'

/**
 * `sanitize()` is the site's only XSS boundary. Its output feeds the single
 * `dangerouslySetInnerHTML` in the codebase (pages/BlogPost.tsx), and its input
 * is whatever HTML someone authored in WordPress — a separate system, editable
 * by anyone with blog access. If this function regresses, the blog becomes a
 * script-injection vector into the marketing site.
 *
 * These cover the cases the function actually promises to handle. They are not
 * a claim that the output is safe against an adversary who controls the blog:
 * this is an allowlist-free, remove-what-we-know-about sanitizer, so treat blog
 * write access as trusted regardless.
 */
describe('sanitize', () => {
  it('removes executable elements', () => {
    const dirty = `
      <p>Keep me</p>
      <script>alert(1)</script>
      <iframe src="https://evil.test"></iframe>
      <object data="x.swf"></object>
      <embed src="x.swf" />
      <form action="/steal"><input name="pw" /></form>
      <link rel="stylesheet" href="x.css" />
      <meta http-equiv="refresh" content="0;url=https://evil.test" />
      <style>body{display:none}</style>
    `
    const clean = sanitize(dirty)

    expect(clean).toContain('Keep me')
    for (const tag of ['script', 'iframe', 'object', 'embed', 'form', 'link', 'meta', 'style']) {
      expect(clean.toLowerCase()).not.toContain(`<${tag}`)
    }
  })

  it('strips inline event handlers, whatever their casing', () => {
    const clean = sanitize(
      `<div onclick="steal()" ONMOUSEOVER="steal()" onError="steal()">hi</div>`,
    )

    expect(clean).toContain('hi')
    expect(clean.toLowerCase()).not.toContain('onclick')
    expect(clean.toLowerCase()).not.toContain('onmouseover')
    expect(clean.toLowerCase()).not.toContain('onerror')
    expect(clean).not.toContain('steal()')
  })

  it('rejects javascript: URLs in href and src', () => {
    const clean = sanitize(
      `<a href="javascript:alert(1)">a</a><img src="JavaScript:alert(1)" />`,
    )

    expect(clean.toLowerCase()).not.toContain('javascript:')
  })

  it('rejects javascript: URLs regardless of leading whitespace', () => {
    // The check trims before comparing, so a leading space or newline — which
    // browsers ignore when resolving the URL — must not slip past it.
    const clean = sanitize(`<a href="  javascript:alert(1)">a</a>`)

    expect(clean.toLowerCase()).not.toContain('javascript:')
  })

  it('keeps ordinary links and images', () => {
    const clean = sanitize(`<a href="https://example.test/x">x</a><img src="/a.png" />`)

    expect(clean).toContain('https://example.test/x')
    expect(clean).toContain('/a.png')
  })

  it('forces links to open safely in a new tab', () => {
    const clean = sanitize(`<a href="https://example.test">x</a>`)

    expect(clean).toContain('target="_blank"')
    expect(clean).toContain('rel="noreferrer noopener"')
  })

  it('overrides an attacker-supplied rel', () => {
    // Without the override, `rel=""` on a target=_blank link hands the opened
    // page a window.opener reference back to the site.
    const clean = sanitize(`<a href="https://evil.test" rel="" target="_self">x</a>`)

    expect(clean).toContain('rel="noreferrer noopener"')
    expect(clean).toContain('target="_blank"')
  })

  it('lazy-loads images', () => {
    expect(sanitize(`<img src="/a.png" />`)).toContain('loading="lazy"')
  })

  it('returns an empty string for empty input', () => {
    expect(sanitize('')).toBe('')
  })
})

describe('decodeHtml', () => {
  it('decodes entities and drops tags', () => {
    expect(decodeHtml('<em>Rock &amp; roll</em> &#8212; live')).toBe('Rock & roll — live')
  })

  it('does not execute anything it decodes', () => {
    // Tags are regex-stripped before the string reaches the DOM, so the img
    // never exists to fire its onerror.
    expect(decodeHtml('<img src=x onerror="alert(1)">safe')).toBe('safe')
  })
})

describe('readingTime', () => {
  it('never rounds down to zero', () => {
    expect(readingTime('<p>one word</p>')).toBe('1 min read')
  })

  it('ignores markup when counting', () => {
    const words = Array.from({ length: 440 }, () => 'word').join(' ')
    expect(readingTime(`<p class="a-long-class-name">${words}</p>`)).toBe('2 min read')
  })
})

describe('formatDate', () => {
  it('renders a date-only string as that calendar day, in any timezone', () => {
    // Without the UTC pin this reads "September 30, 2020" anywhere west of
    // Greenwich, which is where the whole audience is.
    expect(formatDate('2020-10-01')).toBe('October 1, 2020')
  })

  it('leaves a full timestamp in the reader’s zone', () => {
    // Midday UTC lands on the same calendar day either side of Greenwich, so
    // this assertion holds wherever the suite runs.
    expect(formatDate('2021-12-04T12:00:00+00:00')).toBe('December 4, 2021')
  })
})
