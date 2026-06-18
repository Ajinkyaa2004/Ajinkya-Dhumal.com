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
- **Anthropic API** (`@anthropic-ai/sdk`) — the "Ask Ajinkya" AI assistant, served by a Vercel serverless function (`api/chat.js`)

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
vercel.json              # SPA rewrites (excludes /api)

api/                     # Vercel serverless functions
  chat.js                # "Ask Ajinkya" assistant (Anthropic Messages API)
  _knowledge.js          # grounding knowledge base (not a route — leading "_")

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
domain. `vercel.json` already handles SPA rewrites for the client-side routes, and Vercel
auto-detects the `api/` folder as serverless functions.

### Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Required | Purpose |
|----------|----------|---------|
| `ANTHROPIC_API_KEY` | For the AI assistant only | Powers the "Ask Ajinkya" chat (`api/chat.js`). Get one at [console.anthropic.com](https://console.anthropic.com). |

The assistant **degrades gracefully**: with no key set, `api/chat.js` returns a friendly
fallback (pointing visitors to email/links) instead of erroring, so the widget never looks
broken. Add the key whenever you want live answers, then redeploy. The model is set at the
top of `api/chat.js` (`claude-opus-4-8`) — switch to e.g. `claude-haiku-4-5` for lower
cost/latency on a public endpoint. The endpoint is unauthenticated; monitor usage in the
Anthropic console.

> The key is a server-side secret — it lives only in Vercel's env settings, never in the repo
> (`.env*` is gitignored). See `.env.example`.

## Notes

- Live résumé downloads: `public/resume-engineer.pdf` and `public/resume-pm.pdf`.
- Each route is code-split and lazy-loaded; the homepage entry stays lean.
- The "Ask Ajinkya" knowledge base (`api/_knowledge.js`) is kept in sync by hand with `src/data/*` — update it when the data files change.
