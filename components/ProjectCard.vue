<script setup>
// 3D tilt + cursor-following spotlight.
defineProps({ project: { type: Object, required: true } })
const el = ref(null)

function onMove(e) {
  const r = el.value.getBoundingClientRect()
  const x = e.clientX - r.left, y = e.clientY - r.top
  el.value.style.setProperty('--mx', `${x}px`)
  el.value.style.setProperty('--my', `${y}px`)
  el.value.style.setProperty('--ry', `${(x / r.width - 0.5) * 4}deg`)
  el.value.style.setProperty('--rx', `${-(y / r.height - 0.5) * 4}deg`)
}
function onLeave() {
  el.value.style.setProperty('--rx', '0deg')
  el.value.style.setProperty('--ry', '0deg')
}
</script>

<template>
  <article ref="el" class="card" @mousemove="onMove" @mouseleave="onLeave">
    <div>
      <div class="cover" :style="{ '--a': `${project.id * 40 + 120}deg` }" aria-hidden="true">
        <span>{{ String(project.id).padStart(2, '0') }}</span>
      </div>
      <div class="card-top"><span>{{ project.featured ? '★ Featured' : 'Project' }}</span><span>{{ project.year }}</span></div>
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
      <div class="card-links">
        <a v-if="project.url && project.url !== '#'" :href="project.url" target="_blank" rel="noopener">Live ↗</a>
        <a v-if="project.repo && project.repo !== '#'" :href="project.repo" target="_blank" rel="noopener">Code ↗</a>
      </div>
    </div>
    <div class="tags"><span v-for="t in project.tags" :key="t">{{ t }}</span></div>
  </article>
</template>
