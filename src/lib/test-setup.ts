/**
 * Installs a linkedom-backed DOMParser for the test run.
 *
 * This mirrors `scripts/prerender.mjs` exactly — same shim, same wrapping — so
 * the sanitizer tests exercise the DOM implementation the build actually uses
 * in Node, rather than a third one.
 *
 * happy-dom was the obvious alternative and is a worse fit here: the sanitizer
 * fixtures deliberately contain <link>, <iframe> and <script> tags, and
 * happy-dom eagerly tries to fetch them on parse. That makes the suite hit the
 * network to test a function whose entire job is to remove those elements.
 * linkedom just parses.
 *
 * The wrapping matters: given a bare fragment, linkedom's own DOMParser parses
 * the markup as-is rather than synthesising the html/head/body a browser
 * creates, which leaves `body.innerHTML` empty and would silently make every
 * sanitize() assertion pass against an empty string.
 */
import { parseHTML } from 'linkedom'

const { document: sharedDocument } = parseHTML('<!doctype html><html><body></body></html>')

globalThis.DOMParser = class {
  parseFromString(html: string) {
    return parseHTML(`<!doctype html><html><body>${html}</body></html>`).document
  }
} as unknown as typeof DOMParser

globalThis.document = sharedDocument as unknown as Document
