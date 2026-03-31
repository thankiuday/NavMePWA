/**
 * Pure Node.js PNG icon generator — zero external dependencies.
 * Generates icon-192.png and icon-512.png for the PWA manifest.
 *
 * Usage: node scripts/gen-icons.mjs
 */
import { createWriteStream, mkdirSync } from 'fs'
import { deflateSync } from 'zlib'

// ── PNG encoder ──────────────────────────────────────────────────────────────
function crc32(buf) {
  const table = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[i] = c
  }
  let crc = 0xffffffff
  for (const b of buf) crc = table[(crc ^ b) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii')
  const lenBuf  = Buffer.alloc(4)
  lenBuf.writeUInt32BE(data.length)
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])))
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf])
}

function encodePNG(pixels, width, height) {
  const PNG_SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  // IHDR
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8    // bit depth
  ihdr[9] = 2    // color type: RGB
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0

  // Raw image data (filter byte 0 before each row)
  const raw = Buffer.alloc(height * (1 + width * 3))
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 3)] = 0 // filter type: None
    for (let x = 0; x < width; x++) {
      const pi = (y * width + x) * 3
      const ri = y * (1 + width * 3) + 1 + x * 3
      raw[ri]     = pixels[pi]
      raw[ri + 1] = pixels[pi + 1]
      raw[ri + 2] = pixels[pi + 2]
    }
  }

  const idat = deflateSync(raw, { level: 6 })
  const iend = Buffer.alloc(0)

  return Buffer.concat([
    PNG_SIG,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', iend),
  ])
}

// ── Icon renderer ────────────────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t }

function renderIcon(size) {
  const pixels = new Uint8Array(size * size * 3)

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 3

      // Normalize to [-1, 1]
      const nx = (x / size) * 2 - 1
      const ny = (y / size) * 2 - 1

      // Corner radius: rounded rect SDF
      const rx = size * 0.22
      const qx = Math.abs(x - size / 2) - (size / 2 - rx)
      const qy = Math.abs(y - size / 2) - (size / 2 - rx)
      const sdf = Math.sqrt(Math.max(qx, 0) ** 2 + Math.max(qy, 0) ** 2) - rx

      if (sdf > 0.5) {
        // Outside — transparent → background dark
        pixels[idx] = 15; pixels[idx+1] = 15; pixels[idx+2] = 19
        continue
      }

      // Gradient: top-left = brand #6366f1, bottom-right = accent #8b5cf6
      const t = (x + y) / (size * 2)
      const br = Math.round(lerp(0x63, 0x8b, t))
      const bg = Math.round(lerp(0x66, 0x5c, t))
      const bb = Math.round(lerp(0xf1, 0xf6, t))

      // Pin geometry
      const cx = size / 2
      const cy = size * 0.42  // center of pin circle
      const pinR = size * 0.28
      const dx = x - cx
      const dy = y - cy

      // Pin circle
      const distCircle = Math.sqrt(dx * dx + dy * dy) - pinR
      if (distCircle < 0) {
        // White pin body
        const innerR  = size * 0.13
        const distInner = Math.sqrt(dx * dx + dy * dy) - innerR
        if (distInner < 0) {
          // Brand-color inner dot
          pixels[idx] = br; pixels[idx+1] = bg; pixels[idx+2] = bb
        } else {
          pixels[idx] = 255; pixels[idx+1] = 255; pixels[idx+2] = 255
        }
        continue
      }

      // Pin tail (triangle below circle)
      const tailTop  = cy + pinR * 0.85
      const tailBot  = size * 0.82
      const progress = Math.max(0, (y - tailTop) / (tailBot - tailTop))
      const halfW    = pinR * (1 - progress)
      const inTail   = y > tailTop && y < tailBot && Math.abs(dx) < halfW

      if (inTail) {
        pixels[idx] = 255; pixels[idx+1] = 255; pixels[idx+2] = 255
        continue
      }

      // Gradient background
      pixels[idx] = br; pixels[idx+1] = bg; pixels[idx+2] = bb
    }
  }

  return encodePNG(pixels, size, size)
}

// ── Write files ──────────────────────────────────────────────────────────────
mkdirSync('public/icons', { recursive: true })

const sizes = [192, 512]
for (const size of sizes) {
  const buf  = renderIcon(size)
  const path = `public/icons/icon-${size}.png`
  const ws   = createWriteStream(path)
  ws.write(buf)
  ws.end()
  console.log(`✓ Generated ${path} (${size}×${size}, ${buf.length} bytes)`)
}
