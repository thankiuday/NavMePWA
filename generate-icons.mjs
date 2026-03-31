/**
 * Generates placeholder PNG icons for the PWA.
 * Run once: node generate-icons.mjs
 * Replace with real icons before production deployment.
 */
import { createCanvas } from 'canvas'
import { writeFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

function drawIcon(size) {
  const canvas = createCanvas(size, size)
  const ctx    = canvas.getContext('2d')
  const r      = size * 0.22 // corner radius

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, size, size)
  grad.addColorStop(0, '#6366f1')
  grad.addColorStop(1, '#8b5cf6')

  // Rounded rect background
  ctx.beginPath()
  ctx.moveTo(r, 0)
  ctx.lineTo(size - r, 0)
  ctx.quadraticCurveTo(size, 0, size, r)
  ctx.lineTo(size, size - r)
  ctx.quadraticCurveTo(size, size, size - r, size)
  ctx.lineTo(r, size)
  ctx.quadraticCurveTo(0, size, 0, size - r)
  ctx.lineTo(0, r)
  ctx.quadraticCurveTo(0, 0, r, 0)
  ctx.closePath()
  ctx.fillStyle = grad
  ctx.fill()

  // Pin body
  const cx  = size / 2
  const top = size * 0.18
  const pinW = size * 0.32
  const pinH = size * 0.5

  ctx.beginPath()
  ctx.arc(cx, top + pinW, pinW, Math.PI, 0)
  ctx.lineTo(cx, top + pinH)
  ctx.closePath()
  ctx.fillStyle = 'rgba(255,255,255,0.9)'
  ctx.fill()

  // Inner circle
  ctx.beginPath()
  ctx.arc(cx, top + pinW, pinW * 0.45, 0, Math.PI * 2)
  ctx.fillStyle = '#6366f1'
  ctx.fill()

  ctx.beginPath()
  ctx.arc(cx, top + pinW, pinW * 0.2, 0, Math.PI * 2)
  ctx.fillStyle = 'white'
  ctx.fill()

  return canvas.toBuffer('image/png')
}

mkdirSync('public/icons', { recursive: true })

try {
  writeFileSync('public/icons/icon-192.png', drawIcon(192))
  writeFileSync('public/icons/icon-512.png', drawIcon(512))
  console.log('✓ Icons generated: public/icons/icon-192.png, icon-512.png')
} catch (e) {
  console.error('Icon generation failed (canvas not installed). Using SVG fallback only.', e.message)
}
