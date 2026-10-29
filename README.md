# portfolio-client (Nuxt 3)

## Prerequisites
- Node.js 20+ (LTS)

## Run

```powershell
npm install
copy .env.example .env     # points at http://localhost:8000/api
npm run dev                # http://localhost:3000
```

The site works without the API (it falls back to sample data in `utils/fallback.js`); the footer shows `data: live API` or `sample`.

## Personalise
- `utils/profile.js` — name, bio, email, links, stats
- Projects / skills / experience — edit in MySQL via phpMyAdmin (or `utils/fallback.js` offline)

## Features
- Design-tool canvas: dot grid, crosshair guides and live x/y readout
- "Sean" name tag that follows your cursor over the empty background
- Terminal-style hero that types an intro
- Command palette (`Ctrl/⌘ + K`): navigate, switch theme/accent, copy email
- Live accent colour + light/dark theme, remembered between visits
- Scroll reveals, animated skill bars and counters
- 3D-tilt project cards with cursor spotlight and tag filter
- Contact form saved to MySQL through Laravel (validation, honeypot, rate limit)
- Respects `prefers-reduced-motion`
