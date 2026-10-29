<script setup>
// Tiny accent-coloured burst on click. Also triggered by a `burst` window event ({ x, y, n }).
function burst(x, y, n = 10) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  for (let i = 0; i < n; i++) {
    const el = document.createElement('i')
    const size = 4 + Math.random() * 4
    Object.assign(el.style, {
      position: 'fixed', left: `${x}px`, top: `${y}px`, width: `${size}px`, height: `${size}px`,
      borderRadius: '50%', background: 'var(--accent)', pointerEvents: 'none', zIndex: 210
    })
    document.body.appendChild(el)
    const a = Math.random() * Math.PI * 2
    const d = 36 + Math.random() * (n > 12 ? 120 : 56)
    el.animate(
      [
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d}px)) scale(0)`, opacity: 0 }
      ],
      { duration: 550 + Math.random() * 350, easing: 'cubic-bezier(.2,.8,.2,1)' }
    ).onfinish = () => el.remove()
  }
}

const onClick = (e) => {
  if (e.target.closest?.('input, textarea, select, .palette')) return
  burst(e.clientX, e.clientY)
}
const onBurst = (e) => {
  const { x = innerWidth / 2, y = innerHeight / 2, n = 24 } = e.detail || {}
  burst(x, y, n)
}

onMounted(() => {
  addEventListener('click', onClick)
  addEventListener('burst', onBurst)
})
onBeforeUnmount(() => {
  removeEventListener('click', onClick)
  removeEventListener('burst', onBurst)
})
</script>

<template>
  <span hidden aria-hidden="true" />
</template>
