/**
 * Guards `imageSize.ts` against the files it describes.
 *
 * The dimensions there are hand-maintained, and a wrong number is worse than a
 * missing one: it hands the browser an aspect ratio the image doesn't have, so
 * the space reserved is the wrong shape and the shift it was meant to prevent
 * happens anyway. These tests read the real headers and compare.
 */
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { imageSize, knownImages } from './imageSize'

const imagesDir = path.resolve(import.meta.dirname, '../../public/images')

/**
 * Reads intrinsic dimensions out of a PNG, JPEG or WebP header.
 *
 * A parser rather than an image library because this is the only thing in the
 * repo that needs one, and the three container formats the site actually ships
 * put their dimensions a fixed distance into the file.
 */
function readDimensions(file: string): [number, number] {
  const buf = readFileSync(path.join(imagesDir, file))

  // PNG: IHDR is always the first chunk, width/height at a fixed offset.
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return [buf.readUInt32BE(16), buf.readUInt32BE(20)]
  }

  // WebP: RIFF container, dimensions depend on which codec chunk follows.
  if (buf.subarray(0, 4).toString('ascii') === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WEBP') {
    const chunk = buf.subarray(12, 16).toString('ascii')
    if (chunk === 'VP8 ') {
      // Lossy: 14-bit width/height follow the 3-byte start code at offset 23.
      return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff]
    }
    if (chunk === 'VP8L') {
      // Lossless: 14 bits each, packed across four bytes after the signature.
      const bits = buf.readUInt32LE(21)
      return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1]
    }
    if (chunk === 'VP8X') {
      // Extended: 24-bit canvas size, stored minus one.
      return [
        (buf.readUIntLE(24, 3) & 0xffffff) + 1,
        (buf.readUIntLE(27, 3) & 0xffffff) + 1,
      ]
    }
    throw new Error(`${file}: unrecognized WebP chunk ${chunk}`)
  }

  // JPEG: walk the marker segments to the frame header, which carries the size.
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2
    while (offset < buf.length) {
      if (buf[offset] !== 0xff) throw new Error(`${file}: lost JPEG marker alignment`)
      const marker = buf[offset + 1]!
      const length = buf.readUInt16BE(offset + 2)
      // SOF0-SOF15, excluding the DHT/JPG/DAC markers interleaved in that range.
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return [buf.readUInt16BE(offset + 7), buf.readUInt16BE(offset + 5)]
      }
      offset += 2 + length
    }
    throw new Error(`${file}: no JPEG frame header`)
  }

  throw new Error(`${file}: unrecognized image format`)
}

const filesOnDisk = readdirSync(imagesDir).filter((f) => /\.(webp|png|jpe?g)$/i.test(f))

describe('imageSize', () => {
  it('covers every image in public/images', () => {
    expect([...filesOnDisk].sort()).toEqual([...knownImages].sort())
  })

  it.each(filesOnDisk)('matches the real dimensions of %s', (file) => {
    const [width, height] = readDimensions(file)
    expect(imageSize(`/images/${file}`)).toEqual({ width, height })
  })

  it('resolves a src that carries a deploy base prefix', () => {
    expect(imageSize('/carbonless-website-new/images/Logo.webp')).toEqual({ width: 512, height: 512 })
  })

  it('contributes nothing for an image it does not know', () => {
    // WordPress featured images are remote and arrive at runtime, so no entry
    // exists for them and the img has to come out unchanged.
    expect(imageSize('https://example.test/wp-content/featured.jpg')).toEqual({})
    expect(imageSize(undefined)).toEqual({})
  })
})
