<script setup>
const { public: { apiBase } } = useRuntimeConfig()

// Load from the Laravel API; fall back to bundled sample data if it's offline.
const { data } = await useAsyncData('portfolio', () =>
  $fetch(`${apiBase}/portfolio`, { timeout: 4000 }).catch(() => null)
)
const portfolio = computed(() => data.value ?? fallbackPortfolio)
const fromApi = computed(() => !!data.value)

// projects filter
const activeTag = ref('All')
// one chip per project type (its first tag) keeps the filter short
const tags = computed(() => ['All', ...new Set(portfolio.value.projects.map((p) => p.tags[0]))])
const projects = computed(() =>
  activeTag.value === 'All' ? portfolio.value.projects : portfolio.value.projects.filter((p) => p.tags.includes(activeTag.value))
)

// skills grouped by category
const skillGroups = computed(() => {
  const groups = {}
  for (const s of portfolio.value.skills) (groups[s.category] ||= []).push(s)
  const rank = (c) => (order.indexOf(c) === -1 ? order.length : order.indexOf(c))
  return Object.entries(groups).sort(([a], [b]) => rank(a) - rank(b))
})
const order = ['Design', 'Frontend', 'Multimedia', 'Backend & Data', 'Workflow']
const glyphs = { Design: '✎', Frontend: '</>', Multimedia: '▶', 'Backend & Data': '≣', Workflow: '◎' }

// live local time
const time = ref('')
function tickClock() {
  time.value = new Date().toLocaleTimeString('en-US', { timeZone: profile.timezone, hour: '2-digit', minute: '2-digit' })
}

// stats count-up
const counts = ref(profile.stats.map(() => 0))
function countUp() {
  const start = performance.now()
  const run = (now) => {
    const t = Math.min((now - start) / 1400, 1)
    const e = 1 - Math.pow(1 - t, 3)
    counts.value = profile.stats.map((s) => Math.round(s.value * e))
    if (t < 1) requestAnimationFrame(run)
  }
  requestAnimationFrame(run)
}

onMounted(() => {
  tickClock()
  const clock = setInterval(tickClock, 15000)
  onBeforeUnmount(() => clearInterval(clock))

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      e.target.classList.add('in')
      if (e.target.dataset.count !== undefined) countUp()
      io.unobserve(e.target)
    }
  }, { threshold: 0.15 })
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <div id="top">
    <SiteNav />

    <main>
      <section class="hero">
        <div class="wrap hero-grid">
          <div>
            <div class="status"><span class="dot" /> Available for work · {{ profile.location }} <span v-if="time" class="nowrap">· {{ time }}</span></div>
            <h1>
              Crafting<br>
              <em>interfaces</em><br>
              that feel alive.
            </h1>
            <p class="lead">{{ profile.bio }}</p>
            <div class="hero-cta">
              <a href="#projects" class="btn primary">View my work ↓</a>
              <a href="#contact" class="btn">Let's talk</a>
            </div>
          </div>
          <HeroTerminal />
        </div>
      </section>

      <section id="about">
        <div class="wrap">
          <p class="eyebrow reveal">Frame 01 · About</p>
          <h2 class="reveal">UI / UX Designer<br>&amp; Frontend Developer.</h2>
          <div class="about-grid">
            <figure class="portrait reveal">
              <img :src="profile.photo" :alt="`Portrait of ${profile.name}`" width="800" height="1067" loading="lazy">
              <figcaption><span class="dot" /> {{ profile.location }}</figcaption>
            </figure>
            <div class="about-right">
              <div class="about-text reveal">
                <p v-for="p in profile.about" :key="p">{{ p }}</p>
              </div>
              <div class="stats reveal" data-count>
                <div v-for="(s, i) in profile.stats" :key="s.label" class="stat">
                  <b>{{ counts[i] }}{{ s.suffix }}</b><span>{{ s.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div class="wrap">
          <p class="eyebrow reveal">Frame 02 · Skills</p>
          <h2 class="reveal">The toolbox.</h2>
          <div class="skills-grid">
            <div v-for="([cat, list], i) in skillGroups" :key="cat" class="skill-group reveal" :style="{ '--d': `${i * 0.08}s` }">
              <h3><i class="glyph" aria-hidden="true">{{ glyphs[cat] || '✦' }}</i>{{ cat }}</h3>
              <div v-for="s in list" :key="s.id" class="skill">
                <div class="skill-row"><span>{{ s.name }}</span><small>{{ s.level }}%</small></div>
                <div class="bar"><i :style="{ '--w': `${s.level}%` }" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process">
        <div class="wrap">
          <p class="eyebrow reveal">Frame 03 · Process</p>
          <h2 class="reveal">How an idea becomes a product.</h2>
          <div class="reveal"><ProcessPlayground /></div>
        </div>
      </section>

      <section id="projects">
        <div class="wrap">
          <p class="eyebrow reveal">Frame 04 · Projects</p>
          <h2 class="reveal">Selected work.</h2>
          <div class="filters reveal" role="group" aria-label="Filter projects">
            <button v-for="t in tags" :key="t" class="chip" :class="{ on: activeTag === t }" @click="activeTag = t">{{ t }}</button>
          </div>
          <TransitionGroup name="pop" tag="div" class="projects-grid">
            <ProjectCard v-for="p in projects" :key="p.id" :project="p" />
          </TransitionGroup>
        </div>
      </section>

      <section id="experience">
        <div class="wrap">
          <p class="eyebrow reveal">Frame 05 · Experience</p>
          <h2 class="reveal">Where I've been.</h2>
          <div class="timeline">
            <div v-for="(j, i) in portfolio.experiences" :key="j.id" class="job reveal" :style="{ '--d': `${i * 0.1}s` }">
              <time>{{ j.period }}</time>
              <h3>{{ j.role }} <span>@ {{ j.company }}</span></h3>
              <p>{{ j.summary }}</p>
            </div>
          </div>
          <h3 class="sub reveal">Education</h3>
          <div class="timeline">
            <div v-for="(e, i) in profile.education" :key="e.id" class="job reveal" :style="{ '--d': `${i * 0.1}s` }">
              <time>{{ e.period }}</time>
              <h3>{{ e.title }} <span>@ {{ e.place }}</span></h3>
              <p>{{ e.summary }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div class="wrap">
          <p class="eyebrow reveal">Frame 06 · Contact</p>
          <h2 class="reveal">Let's build something.</h2>
          <div class="contact-grid">
            <div class="reveal">
              <p class="muted">Have a project, an idea or just want to say hi? My inbox is open.</p>
              <a :href="`mailto:${profile.email}`" class="contact-big">{{ profile.email }}</a>
              <div class="socials">
                <a :href="profile.github" target="_blank" rel="noopener">GitHub ↗</a>
                <a :href="profile.facebook" target="_blank" rel="noopener">Facebook ↗</a>
              </div>
              <p class="muted" style="margin-top:28px;font-family:var(--mono);font-size:.78rem">
                tip: press <b style="color:var(--ink)">Ctrl/⌘ + K</b> for the command palette
              </p>
            </div>
            <div class="reveal"><ContactForm /></div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div class="wrap">
        <span>© {{ new Date().getFullYear() }} {{ profile.name }}</span>
        <span>Nuxt · Laravel · MySQL · data: {{ fromApi ? 'live API' : 'sample' }}</span>
      </div>
    </footer>
  </div>
</template>
