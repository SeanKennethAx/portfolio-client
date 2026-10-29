<script setup>
// Design-tool canvas: a dot grid that lights up under the cursor, with crosshair guides
// and a live x / y readout.
const canvas = ref(null)
const coords = ref('')
const GAP = 28
const RADIUS = 150
let ctx, w, h, dpr, raf, fine = false
let accent = '198,255,61', ink = '255,255,255', tick = 0, dirty = true
const mouse = { x: -9999, y: -9999 }

const rgb = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16)
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`
}

function readColors() {
  const s = getComputedStyle(document.documentElement)
  const a = s.getPropertyValue('--accent').trim()
  const i = s.getPropertyValue('--ink').trim()
  if (/^#[0-9a-f]{6}$/i.test(a)) accent = rgb(a)
  if (/^#[0-9a-f]{6}$/i.test(i)) ink = rgb(i)
  dirty = true
}

function resize() {
  dpr = Math.min(devicePixelRatio || 1, 2)
  w = innerWidth; h = innerHeight
  canvas.value.width = w * dpr; canvas.value.height = h * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  dirty = true
}

function draw() {
  if (++tick % 30 === 0) readColors()
  if (dirty) {
    ctx.clearRect(0, 0, w, h)
    if (fine && mouse.x > -9000) {
      ctx.strokeStyle = `rgba(${accent},0.16)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(mouse.x + 0.5, 0); ctx.lineTo(mouse.x + 0.5, h)
      ctx.moveTo(0, mouse.y + 0.5); ctx.lineTo(w, mouse.y + 0.5)
      ctx.stroke()
    }
    for (let x = GAP / 2; x < w; x += GAP) {
      for (let y = GAP / 2; y < h; y += GAP) {
        ctx.fillStyle = `rgba(${ink},0.11)`
        ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5)
        const d = Math.hypot(x - mouse.x, y - mouse.y)
        if (d < RADIUS) {
          const t = 1 - d / RADIUS
          ctx.fillStyle = `rgba(${accent},${t * 0.85})`
          const s = 1.5 + t * 2.5
          ctx.fillRect(x - s / 2, y - s / 2, s, s)
        }
      }
    }
    dirty = false
  }
  raf = requestAnimationFrame(draw)
}

function onMove(e) {
  mouse.x = e.clientX; mouse.y = e.clientY
  coords.value = `x ${Math.round(e.clientX)}   y ${Math.round(e.clientY)}`
  dirty = true
}
function onLeave() { mouse.x = mouse.y = -9999; coords.value = ''; dirty = true }

onMounted(async () => {
  await nextTick()
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d')
  fine = matchMedia('(pointer: fine)').matches
  readColors()
  resize()
  addEventListener('resize', resize)
  if (fine && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
  }
  draw()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  removeEventListener('resize', resize)
  removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseleave', onLeave)
})
</script>

<template>
  <div aria-hidden="true">
    <canvas ref="canvas" class="particles" />
    <span v-if="coords" class="coords">{{ coords }}</span>
  </div>
</template>
