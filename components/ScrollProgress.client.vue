<script setup>
const el = ref(null)

function update() {
  const max = document.documentElement.scrollHeight - innerHeight
  el.value?.style.setProperty('--p', max > 0 ? scrollY / max : 0)
}

onMounted(() => {
  update()
  addEventListener('scroll', update, { passive: true })
  addEventListener('resize', update)
})
onBeforeUnmount(() => {
  removeEventListener('scroll', update)
  removeEventListener('resize', update)
})
</script>

<template>
  <div ref="el" class="progress" aria-hidden="true" />
</template>
