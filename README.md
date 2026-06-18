# ajinkyadhumal.com

Ajinkya Dhumal's personal portfolio — **one site, four routes**, each tuned to a different audience, sharing one animated personal-brand foundation.

| Route | Audience | Accent |
|-------|----------|--------|
| `/` | Anyone (the hub) | Indigo |
| `/engineer` | Tech recruiters | Cyan |
| `/pm` | PM hiring managers | Violet |
| `/freelance` | Business clients | Emerald |

## Tech stack

- **Vite 7** + **React 19** (SPA, code-split per route)
- **Tailwind CSS 3** (dark theme, per-route accent via CSS variables)
- **GSAP + ScrollTrigger** — splash, pinned horizontal timeline, parallax, scroll reveals, cursor follower
- **Framer Motion** — component interactions, tilt/magnetic, page transitions
- **Lottie** (`lottie-react`, `@lottiefiles/dotlottie-react`) — hero illustrations + loading state
- **React Router 7**

## Getting started

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Project structure

```
index.html               # entry HTML (base SEO + JSON-LD)
vite.config.js           # Vite + manual vendor chunks
tailwind.config.js
vercel.json              # SPA rewrites

src/
  main.jsx               # React Router setup
  App.jsx                # layout: splash → navbar → routed page → footer
  pages/                 # HomePage, EngineerPage, PMPage, FreelancePage
  components/
    shared/              # Navbar, SplashScreen, Seo, AnimationUtils, About,
                         # EducationTimeline, Achievements, Contact, Footer,
                         # CursorFollower, Loading overlay/lottie, SharedBottom
    home/ engineer/ pm/ freelance/   # route-specific sections
  data/                  # engineer-data, pm-data, freelance-data, shared-data
  lib/                   # gsap.js (configured + useGSAP), perf.js (capability detection)
  lottie/                # bundled hero/loading animations (only the ones in use)
  styles/index.css       # theme tokens, keyframes, per-route accents

public/                  # static assets served at site root
  clients/               # optimized client screenshots (Built for Clients)
  logos/  lottie/  projects/   # logos, dotLottie, per-project case-study pages
  resume-engineer.pdf  resume-pm.pdf
  favicon.ico  D.png  og-image.*  manifest.json  robots.txt  sitemap.xml
```

## Deploy

Push to GitHub, import on Vercel (framework preset **Vite**, output `dist/`), and add the
domain. `vercel.json` already handles SPA rewrites for the client-side routes.

## Notes

- Live résumé downloads: `public/resume-engineer.pdf` and `public/resume-pm.pdf`.
- Each route is code-split and lazy-loaded; the homepage entry stays lean.
