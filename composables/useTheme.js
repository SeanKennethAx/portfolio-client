export const accents = [
  { name: 'Lime', value: '#c6ff3d' },
  { name: 'Violet', value: '#a78bfa' },
  { name: 'Coral', value: '#ff6b5e' },
  { name: 'Sky', value: '#4cc9f0' },
  { name: 'Amber', value: '#ffb703' }
]

// Shared theme state. Applied to <html> and persisted in app.vue.
export const useTheme = () => {
  const accent = useState('accent', () => accents[0].value)
  const mode = useState('mode', () => 'dark')
  const toggleMode = () => { mode.value = mode.value === 'dark' ? 'light' : 'dark' }
  return { accents, accent, mode, toggleMode }
}
