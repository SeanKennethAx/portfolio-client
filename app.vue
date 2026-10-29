<script setup>
const { accent, mode } = useTheme()

function apply() {
  const root = document.documentElement
  root.style.setProperty('--accent', accent.value)
  root.dataset.theme = mode.value
  try {
    localStorage.setItem('accent', accent.value)
    localStorage.setItem('mode', mode.value)
  } catch {}
}

onMounted(() => {
  try {
    accent.value = localStorage.getItem('accent') || accent.value
    mode.value = localStorage.getItem('mode')
      || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
  } catch {}
  document.documentElement.classList.add('ready')
  watch([accent, mode], apply, { immediate: true })
})
</script>

<template>
  <div>
    <ScrollProgress />
    <DotGrid />
    <CursorFollower />
    <ClickBurst />
    <CommandPalette />
    <NuxtPage />
  </div>
</template>
