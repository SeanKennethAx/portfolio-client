<script setup>
const { accents, accent, mode, toggleMode } = useTheme()
const palette = useState('palette', () => false)
const current = ref('')

function cycleAccent() {
  const i = accents.findIndex((a) => a.value === accent.value)
  accent.value = accents[(i + 1) % accents.length].value
}

onMounted(() => {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && (current.value = e.target.id)),
    { rootMargin: '-45% 0px -50% 0px' }
  )
  // the hero has no id, so reaching it clears the highlight
  const hero = document.querySelector('.hero')
  hero && io.observe(hero)
  sections.forEach((s) => { const el = document.getElementById(s.id); el && io.observe(el) })
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <header class="nav">
    <a href="#top" class="logo">sean<span>.dev</span></a>
    <nav aria-label="Primary">
      <ul>
        <li v-for="s in sections" :key="s.id">
          <a :href="`#${s.id}`" :class="{ active: current === s.id }">{{ s.label }}</a>
        </li>
      </ul>
    </nav>
    <div class="nav-tools">
      <button class="icon-btn" aria-label="Change accent colour" @click="cycleAccent">
        <i class="accent-dot" :style="{ background: accent }" />
      </button>
      <button class="icon-btn" :aria-label="`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`" @click="toggleMode">
        {{ mode === 'dark' ? '☾' : '☀' }}
      </button>
      <button class="kbd-btn" aria-label="Open command palette" @click="palette = true">⌘K</button>
    </div>
  </header>
</template>
