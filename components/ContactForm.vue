<script setup>
const { public: { apiBase } } = useRuntimeConfig()
const form = reactive({ name: '', email: '', message: '', website: '' }) // `website` is a honeypot
const errors = reactive({ name: '', email: '', message: '' })
const state = ref('idle') // idle | sending | sent | error
const serverError = ref('')

const rules = {
  name: (v) => (v.trim() ? '' : 'Please tell me your name.'),
  email: (v) => (!v.trim() ? 'Please enter your email.' : /^\S+@\S+\.\S+$/.test(v.trim()) ? '' : "That email doesn't look right."),
  message: (v) => (v.trim().length >= 10 ? '' : 'Write a few more words (at least 10 characters).')
}
const fields = Object.keys(rules)

function check(field) {
  errors[field] = rules[field](form[field])
  return !errors[field]
}

async function submit() {
  const invalid = fields.filter((f) => !check(f))
  if (invalid.length) return document.getElementById(`cf-${invalid[0]}`)?.focus()

  state.value = 'sending'
  serverError.value = ''
  try {
    await $fetch(`${apiBase}/messages`, { method: 'POST', headers: { Accept: 'application/json' }, body: form })
    state.value = 'sent'
    Object.assign(form, { name: '', email: '', message: '', website: '' })
    window.dispatchEvent(new CustomEvent('burst', { detail: { n: 36 } }))
  } catch (e) {
    state.value = 'error'
    const first = e?.data?.errors && Object.values(e.data.errors)[0]?.[0]
    serverError.value = first || 'Could not reach the server. Please email me directly instead.'
  }
}
</script>

<template>
  <div v-if="state === 'sent'" class="sent" role="status">
    <i>✓</i>
    <h3>Message sent</h3>
    <p class="muted">Thanks for reaching out — I'll get back to you soon.</p>
    <button type="button" class="btn" @click="state = 'idle'">Send another</button>
  </div>

  <form v-else novalidate @submit.prevent="submit">
    <div v-for="f in fields" :key="f" class="field" :class="{ invalid: errors[f] }">
      <label :for="`cf-${f}`">{{ f }}</label>
      <textarea
        v-if="f === 'message'" :id="`cf-${f}`" v-model="form[f]" maxlength="3000" placeholder="What would you like to build?"
        :aria-invalid="!!errors[f]" :aria-describedby="`cf-${f}-err`" @blur="check(f)" @input="errors[f] && check(f)"
      />
      <input
        v-else :id="`cf-${f}`" v-model="form[f]" :type="f === 'email' ? 'email' : 'text'" maxlength="150"
        :placeholder="f === 'email' ? 'you@example.com' : 'Your name'" :autocomplete="f"
        :aria-invalid="!!errors[f]" :aria-describedby="`cf-${f}-err`" @blur="check(f)" @input="errors[f] && check(f)"
      >
      <Transition name="err">
        <p v-if="errors[f]" :id="`cf-${f}-err`" class="err" role="alert"><i aria-hidden="true">!</i>{{ errors[f] }}</p>
      </Transition>
    </div>
    <input v-model="form.website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
    <div>
      <button class="btn primary" :disabled="state === 'sending'">
        {{ state === 'sending' ? 'Sending…' : 'Send message →' }}
      </button>
    </div>
    <p v-if="state === 'error'" class="err" role="alert"><i aria-hidden="true">!</i>{{ serverError }}</p>
  </form>
</template>
