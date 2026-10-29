<script setup>
// A small "Sean" tag that trails the cursor over the empty background only.
// It hides over content and stays inside the viewport edges.
const tag = ref(null)
const active = ref(false)
const visible = ref(false)
let raf
const pos = { x: 0, y: 0 }, lag = { x: 0, y: 0 }
const CONTENT = 'a, button, input, textarea, label, img, h1, h2, h3, h4, p, small, time, li, figure, form, pre, .card, .terminal, .skill-group, .preview, .stat, .nav, .palette, .sent, .eyebrow, .status'

function onMove(e) {
  if (!visible.value) { lag.x = e.clientX; lag.y = e.clientY }
  pos.x = e.clientX; pos.y = e.clientY
  visible.value = !e.target.closest?.(CONTENT)
}
const onLeave = () => (visible.value = false)

function loop() {
  lag.x += (pos.x - lag.x) * 0.16
  lag.y += (pos.y - lag.y) * 0.16
  const el = tag.value
  if (el) {
    const x = Math.min(lag.x + 16, innerWidth - el.offsetWidth - 8)
    const y = Math.min(lag.y + 18, innerHeight - el.offsetHeight - 8)
    el.style.transform = `translate(${Math.max(x, 8)}px, ${Math.max(y, 8)}px)`
  }
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  if (!matchMedia('(pointer: fine)').matches) return
  active.value = true
  addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseleave', onLeave)
  loop()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseleave', onLeave)
})
</script>

<template>
  <div v-if="active" ref="tag" class="cursor-tag" :class="{ show: visible }" aria-hidden="true">Sean</div>
</template>
