/**
 * Intrinsic pixel dimensions for everything in `public/images/`.
 *
 * An `<img>` without `width`/`height` has no aspect ratio until its bytes
 * arrive, so the browser reserves no space and the page reflows around it as it
 * loads — layout shift, and the largest images shift the most. The attributes
 * don't size the image (the Tailwind classes still do that); they only give the
 * browser the ratio it needs to hold the space up front.
 *
 * Keyed by bare filename rather than full path because most callers pass a
 * value that already went through `asset()`, so the leading segment varies with
 * the deploy base. A filename that isn't here — a WordPress featured image, say
 * — resolves to no attributes rather than wrong ones.
 *
 * `imageSize.test.ts` reads the real files and fails if this drifts from disk,
 * so add the entry when you add the image and let CI confirm the numbers.
 */
const sizes: Record<string, readonly [number, number]> = {
  'Adam.webp': [500, 368],
  'Ben.webp': [640, 428],
  'Campbell.webp': [640, 436],
  'Jeffrey.webp': [640, 427],
  'Logo.webp': [512, 512],
  'Nexamp_1.webp': [826, 1133],
  'Nexamp_2.webp': [845, 1144],
  'Roma2.webp': [640, 428],
  'XLPage-1200.webp': [1200, 1553],
  'XLPage-600.webp': [600, 777],
  'XLlogo.webp': [85, 61],
  'apple-touch-icon.png': [180, 180],
  'auction.webp': [900, 424],
  'blank_person.webp': [331, 225],
  'craig2.webp': [240, 160],
  'enerfusion-logo.webp': [209, 217],
  'energy-star-logo.webp': [200, 205],
  'favicon-64.png': [64, 64],
  'go-green-transportation-car.webp': [275, 184],
  'harrison2.webp': [292, 199],
  'image5-1920.webp': [1920, 1286],
  'image5-960.webp': [960, 643],
  'image6-1920.webp': [1920, 1286],
  'image6-960.webp': [960, 643],
  'jonathan.webp': [200, 137],
  'nexamp_logo.webp': [900, 288],
  'offsets1.webp': [700, 969],
  'offsets2.webp': [700, 1014],
  'offsets3.webp': [700, 941],
  'offsets4.webp': [700, 954],
  'offsets5.webp': [700, 968],
  'offsets6.webp': [700, 964],
  'og-image.jpg': [1200, 630],
  'orion.webp': [365, 381],
  'qlogoBlue.webp': [160, 116],
  'reserve1-10-1920.webp': [1920, 1285],
  'reserve1-10-960.webp': [960, 643],
  'satori.webp': [642, 297],
  'seals-1200.webp': [1200, 802],
  'seals-600.webp': [600, 401],
  'ucapture.webp': [900, 471],
}

/** The filenames this module knows about — the test iterates them. */
export const knownImages = Object.keys(sizes)

type Dimensions = { width: number; height: number }

/**
 * Dimensions for a `public/images/` src, ready to spread onto an `<img>`.
 *
 * Spread rather than passed as two props so an unknown src contributes nothing:
 * `{...imageSize(remoteUrl)}` leaves the element exactly as it was, where
 * `width={undefined}` would too but reads as though a value was expected.
 *
 * With a `srcSet`, pass the src the `sizes` attribute resolves against — every
 * candidate in a set here shares an aspect ratio, so any of them gives the
 * browser the right box.
 */
export function imageSize(src: string | undefined): Dimensions | Record<string, never> {
  if (!src) return {}
  const name = src.split('/').pop()
  const found = name ? sizes[name] : undefined
  return found ? { width: found[0], height: found[1] } : {}
}
