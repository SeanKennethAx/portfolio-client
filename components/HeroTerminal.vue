<script setup>
// Fake terminal that types out an intro, one command at a time.
const script = [
  { cmd: 'whoami', out: `${profile.handle} — ${profile.role.toLowerCase()}` },
  { cmd: 'skills --top', out: 'ui/ux · wireframes · prototypes · vue' },
  { cmd: 'cat focus.txt', out: 'beautiful • easy-to-use • responsive' },
  { cmd: 'status', out: '● open to new projects' }
]

const lines = ref([]) // { cmd, out, typing }
let stopped = false
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

onMounted(async () => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  for (const step of script) {
    if (stopped) return
    const line = reactive({ cmd: '', out: '', typing: true })
    lines.value.push(line)
    for (const ch of step.cmd) {
      line.cmd += ch
      if (!reduced) await sleep(45 + Math.random() * 55)
      if (stopped) return
    }
    line.typing = false
    if (!reduced) await sleep(250)
    line.out = step.out
    if (!reduced) await sleep(450)
  }
})
onBeforeUnmount(() => (stopped = true))
</script>

<template>
  <div class="terminal">
    <div class="terminal-bar"><i /><i /><i /><span>~/{{ profile.handle }}</span></div>
    <div class="terminal-body" aria-label="Terminal introduction">
      <template v-for="(l, i) in lines" :key="i">
        <div><span class="p">$ </span>{{ l.cmd }}<span v-if="l.typing" class="caret" /></div>
        <span v-if="l.out" class="o">{{ l.out }}</span>
      </template>
      <div v-if="lines.length && !lines[lines.length - 1].typing"><span class="p">$ </span><span class="caret" /></div>
    </div>
  </div>
</template>
