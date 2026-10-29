<script setup>
// Interactive "how I work" demo: step through the process and watch one screen evolve.
const steps = [
  { name: 'Discover', note: 'Listen first. I map user goals, pain points and constraints before drawing anything.' },
  { name: 'Wireframe', note: 'Low-fidelity layouts settle structure and flow — fast and cheap to change.' },
  { name: 'Prototype', note: 'Clickable, high-fidelity screens let people test the experience before any code.' },
  { name: 'Build', note: 'Responsive, mobile-first frontend made of clean, reusable components.' },
  { name: 'Launch', note: 'Cross-browser checks, polish, then ship — and keep improving.' }
]
const notes = ['Who is it for?', 'What do they need?', 'Pain points', 'Success looks like…']
const code = '<section class="card">\n  <h4>Book your stay</h4>\n  <BaseButton @click="reserve">\n    Reserve now\n  </BaseButton>\n</section>'

const stage = ref(0)
const playing = ref(false)
const preview = ref(null)
let timer

function burst() {
  const r = preview.value?.getBoundingClientRect()
  if (r) window.dispatchEvent(new CustomEvent('burst', { detail: { x: r.left + r.width / 2, y: r.top + r.height / 2, n: 30 } }))
}

watch(stage, (v, old) => { if (v === 4 && old !== 4) burst() })
watch(playing, (on) => {
  clearInterval(timer)
  if (on) timer = setInterval(() => (stage.value = (stage.value + 1) % steps.length), 2200)
})
onBeforeUnmount(() => clearInterval(timer))

const go = (i) => { playing.value = false; stage.value = i }
</script>

<template>
  <div class="process">
    <ol class="steps">
      <li v-for="(s, i) in steps" :key="s.name">
        <button type="button" :class="{ on: i === stage, done: i < stage }" @click="go(i)">
          <small>0{{ i + 1 }}</small>{{ s.name }}
        </button>
      </li>
    </ol>

    <div class="stage-panel">
      <div ref="preview" class="preview">
        <div v-if="stage === 0" class="notes">
          <span v-for="(n, i) in notes" :key="n" :style="{ '--r': `${[-4, 3, 5, -3][i]}deg` }">{{ n }}</span>
        </div>
        <template v-else>
          <div class="mock" :class="`s${stage}`">
            <div class="m-img" />
            <h4 class="m-title">Book your stay</h4>
            <p class="m-text">Pick dates, choose a room and confirm in seconds.</p>
            <span class="m-btn">Reserve now</span>
          </div>
          <pre v-if="stage >= 3" class="code">{{ code }}</pre>
        </template>
        <span v-if="stage === 4" class="live"><i class="dot" /> Live</span>
      </div>

      <p class="note" aria-live="polite">{{ steps[stage].note }}</p>

      <div class="controls">
        <input v-model.number="stage" type="range" min="0" max="4" step="1" aria-label="Process stage" @input="playing = false">
        <button type="button" class="chip" @click="playing = !playing">{{ playing ? 'Pause' : '▶ Play' }}</button>
      </div>
    </div>
  </div>
</template>
