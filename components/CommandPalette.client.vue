<script setup>
// Press Ctrl/Cmd + K anywhere to navigate, switch theme or run actions.
const open = useState('palette', () => false)
const query = ref('')
const sel = ref(0)
const input = ref(null)
const { accents, accent, toggleMode } = useTheme()

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
const copyEmail = () => navigator.clipboard?.writeText(profile.email)
function surprise() {
  accent.value = accents[Math.floor(Math.random() * accents.length)].value
  window.dispatchEvent(new CustomEvent('burst', { detail: { n: 48 } }))
}

const commands = computed(() => [
  ...sections.map((s) => ({ label: `Go to ${s.label}`, hint: 'navigate', run: () => go(s.id) })),
  { label: 'Toggle light / dark', hint: 'theme', run: toggleMode },
  ...accents.map((a) => ({ label: `Accent: ${a.name}`, hint: 'theme', swatch: a.value, run: () => (accent.value = a.value) })),
  { label: 'Surprise me ✨', hint: 'fun', run: surprise },
  { label: 'Copy email address', hint: 'action', run: copyEmail },
  { label: 'Open GitHub', hint: 'link', run: () => window.open(profile.github, '_blank', 'noopener') },
  { label: 'Open Facebook', hint: 'link', run: () => window.open(profile.facebook, '_blank', 'noopener') }
])

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  return q ? commands.value.filter((c) => c.label.toLowerCase().includes(q)) : commands.value
})

watch(query, () => (sel.value = 0))
watch(open, async (v) => {
  if (v) { query.value = ''; sel.value = 0; await nextTick(); input.value?.focus() }
})

function run(cmd) {
  if (!cmd) return
  open.value = false
  cmd.run()
}

function onKey(e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open.value = !open.value; return }
  if (!open.value) return
  if (e.key === 'Escape') open.value = false
  else if (e.key === 'ArrowDown') { e.preventDefault(); sel.value = (sel.value + 1) % Math.max(results.value.length, 1) }
  else if (e.key === 'ArrowUp') { e.preventDefault(); sel.value = (sel.value - 1 + results.value.length) % Math.max(results.value.length, 1) }
  else if (e.key === 'Enter') run(results.value[sel.value])
}

onMounted(() => addEventListener('keydown', onKey))
onBeforeUnmount(() => removeEventListener('keydown', onKey))
</script>

<template>
  <div v-if="open" class="palette-backdrop" @click.self="open = false">
    <div class="palette" role="dialog" aria-label="Command palette">
      <input ref="input" v-model="query" placeholder="Type a command…" aria-label="Search commands">
      <ul v-if="results.length">
        <li v-for="(c, i) in results" :key="c.label" :class="{ sel: i === sel }" @mouseenter="sel = i" @click="run(c)">
          <span><i v-if="c.swatch" class="sw" :style="{ background: c.swatch }" />{{ c.label }}</span>
          <small>{{ c.hint }}</small>
        </li>
      </ul>
      <div v-else class="empty">No matching command</div>
      <div class="palette-foot"><span>↑↓ move</span><span>↵ run</span><span>esc close</span></div>
    </div>
  </div>
</template>
