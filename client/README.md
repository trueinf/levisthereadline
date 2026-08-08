# Threadline

**Levi's Agentic Content Orchestration** — a working prototype of a content operations workspace that sits *above* existing tools (Workfront, AEM, commerce, TMS, CRM) and connects a global campaign from master brief to local activation.

It is a two-part application:

- a **React + TypeScript** single-page frontend (the workspace UI), and
- a **Node.js + Express** backend that owns the OpenAI integration and serves the built frontend in production.

The OpenAI API key lives only on the server. It is never imported by the frontend and never reaches the browser bundle.

---

## Tech stack

### Frontend

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | **React 18.3** | Function components + hooks only |
| Language | **TypeScript 5.6** (`strict`) | Plus `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` |
| Build tool | **Vite 5** | `@vitejs/plugin-react`, ESM, dev proxy to the backend |
| Routing | **Custom, state-based** | No router library — a `PageId` union in React Context drives which page renders |
| State | **React Context** (`src/context.tsx`) | Single `AppProvider`; no Redux/Zustand/React Query |
| Styling | **Hand-authored CSS** (`src/index.css`, ~940 lines) | Design tokens + components; no Tailwind, no CSS-in-JS runtime |
| Inline styles | `src/style.ts` | Tiny `s('color:red;gap:8px')` → React style-object helper |
| Icons | `src/icons.tsx` | Inline SVG set, no icon package |

**Zero runtime UI dependencies.** `react` and `react-dom` are the only frontend packages shipped to the browser.

### Backend

| Layer | Choice | Notes |
| --- | --- | --- |
| Runtime | **Node.js ≥ 20** | Native `fetch` and `AbortSignal.timeout`, ESM (`"type": "module"`) |
| Framework | **Express 4** | Router-per-resource, factory pattern (`createApp()`) |
| AI provider | **OpenAI REST API** | Chat Completions + Images, called directly with `fetch` — no SDK |
| Config | **dotenv** | All env parsing centralised and frozen in `server/config.js` |
| Hardening | **express-rate-limit**, **cors**, custom security headers | Rate limit applies to generation routes only |
| Transport | **compression** | Matters — generated images come back as multi-MB base64 |
| Logging | Custom (`server/lib/logger.js`) | Levelled, timestamped, one line per request + per upstream call |
| Static hosting | `express.static` + SPA fallback | Immutable caching for hashed assets, `no-cache` for `index.html` |

### Tooling

- **Two packages** — root `package.json` (frontend) and `server/package.json` (backend), each with its own dependencies and lockfile; the backend runs standalone
- **concurrently** — `npm run dev` runs the API and the Vite dev server together
- **Docker** — multi-stage `Dockerfile` producing a single image (SPA + API)
- No test runner, linter, or CI is configured yet — see [Not built yet](#not-built-yet)

---

## What has been built

### 1. The workspace UI (frontend)

**Global navigation** — 7 pages driven by a `PageId` union:

| Page | Purpose |
| --- | --- |
| **Home** | Portfolio dashboard: hero campaign, readiness metrics, priority actions |
| **Campaigns** | Campaign portfolio with readiness/completeness/risk per campaign |
| **Content Library** | Approved content memory — product truth, market language, assets, rights, usage |
| **Approvals** | Review queue with full decision packages (master, local change, evidence, impact) |
| **Insights** | Cross-campaign intelligence: model acceptance by content type, reuse, recommendations |
| **Agent Activity** | Observability — what agents decided, which tools/models ran, where humans are required |
| **Integrations** | The surrounding system map (Workfront, AEM, commerce, TMS, CRM) |

**Campaign workspace** — an 11-stage lifecycle rendered as tabs (`src/pages/campaign/`):

> Overview · Brief · Readiness · Assemble · Create · Adapt · Translate · Transcreate · Assure · Activate · Learn

**Four portfolio campaigns** are modelled with distinct states (`src/data.ts`):

- *Behind Every Original* — global, 4 markets, **At Risk**
- *Football Federation Partnerships* — 4 federations, **At Risk**
- *501® Thermodapt* — product innovation, **Blocked** (claim approval)
- *REIIMAGINE / Denim Cowboy* — archived reference, **Published**

**Risk drill-downs** — a slide-over Drawer explains each flagged variant with rationale, sources, downstream impact and a recommended action (e.g. *"Japan Instagram blocked — AST-005 rights exclude Japan social use; replace with cleared AST-006"*).

### 2. Live AI generation (frontend + backend)

Three real generation flows, all grounded in campaign context rather than free-form prompting:

1. **Create campaign** (`src/pages/CreateCampaign.tsx`) — define name, brief, product, audience, tone, market and locale; pick from **8 marketing channels** (Instagram, Facebook, SEO/Website, Email, TikTok, Google Ads, X, YouTube); generate every content slot for those channels. Each slot carries its own constraint (*"Subject line, under 45 characters"*, *"SEO title tag, under 60 characters"*), which is passed to the model.
2. **Create content package** (`src/pages/CreatePackage.tsx`) — the Levi's-specific channel packages (e-commerce, CRM, Instagram, paid display, creator brief) with editable campaign context.
3. **Campaign → Create tab** (`src/pages/campaign/Create.tsx`) — fill missing/at-risk slots in an existing package, one at a time or all at once.

Supporting behaviour:

- **Locale-aware generation** — non-English locales produce native copy, not literal translation (`ja-JP`, `fr-FR`, `en-IN`, …)
- **Back-translation for review** — generated non-English copy can be translated to English so a reviewer who does not speak the locale can still approve it (`TRANSLATE_SYSTEM`)
- **Image generation** (`src/components/ImageStudio.tsx`) — on-brand campaign visuals via `gpt-image-1`, returned as `data:` URLs so they render and download without expiry, opened full-page in the viewer
- **Model selection** — `gpt-4o-mini` / `gpt-4o` / `gpt-4.1-mini` / `gpt-4.1`, switchable in the Topbar
- **Prompt construction** (`src/generation.ts`) — system prompts inject brand grounding (core message, product emphasis, proof point, CTA, protected elements) and hard rules: respect character limits, stay factual, no unsupported performance claims, return only the finished text

### 3. The Node backend

Converted from two Netlify serverless functions into a first-class Express service:

- **`POST /api/generate`** — text generation via OpenAI Chat Completions
- **`POST /api/image`** — image generation via OpenAI Images
- **`GET /api/health`** — liveness/readiness probe (never rate-limited, never calls OpenAI)
- **SPA hosting** — serves `dist/` with history fallback, so one process runs the whole app

Added over the original serverless functions:

- **Input validation** on every field, with error messages written to be shown directly in the UI
- **Model allow-lists** for text and image, so a proxied key cannot be pointed at arbitrary models
- **Bounds** on `temperature`, `max_tokens`, `n`, `size`, `quality` and total prompt length
- **Rate limiting** on the generation routes (default 30 requests / 60s per IP)
- **Configurable upstream timeouts** — this removes the real problem with the Netlify version, whose 10s (26s on paid) function ceiling could cut off image generation mid-flight. The Node service defaults to 180s for images.
- **Correct status semantics** — `405` with an `Allow` header on wrong methods, JSON `404` under `/api/*` (never the SPA shell), `503` when the key is missing, `504` on upstream timeout, `502` on unreachable/non-JSON upstream
- **Structured logging** of every request and every OpenAI call with duration
- **Graceful shutdown** on `SIGTERM`/`SIGINT`, with tuned socket timeouts for long image requests

The API response body is **OpenAI's own payload, unchanged**, so the existing client code in `src/api.ts` reads `choices[0].message.content` and `data[0].b64_json` exactly as before.

### Not built yet

Worth knowing before you extend it:

- **No persistence.** All state — created campaigns, generated content, images — lives in React memory and is lost on refresh. There is no database and no backend storage.
- **No authentication.** Any caller who can reach the server can spend the OpenAI key; rate limiting is the only protection.
- **Operational data is synthetic.** Readiness percentages, risk counts, activity logs and the integration statuses are prototype fixtures in `src/data.ts` and the page components, not live system reads.
- **Integrations are illustrative.** Workfront/AEM/commerce/TMS/CRM are represented in the UI; nothing connects to them.
- **No tests, linter, or CI.**

---

## Architecture

```
Development                              Production
───────────                              ──────────
browser :5173                            browser
    │                                        │
    ├── app assets ── Vite dev server        │
    │                                        │
    └── /api/* ──────► proxy ──┐             └── everything ──► Node/Express :8787
                               │                                     ├── /api/*  → routes
                          Node/Express :8787                         └── /*      → dist/ + SPA fallback
                               │                                            │
                               └──► api.openai.com                          └──► api.openai.com
```

The frontend always calls **relative** `/api/...` URLs. In development Vite proxies them to the backend; in production the backend serves the frontend, so the calls are same-origin either way. No `VITE_API_URL`, no CORS in the common case.

---

## Running the server

**Requirements:** Node.js 20 or newer. **Setup is one API key** — nothing else needs configuring.

### First time

```bash
npm install               # frontend deps + (via postinstall) server/ deps
cp .env.example .env      # then paste your key into OPENAI_API_KEY
```

> **Two packages.** The frontend is the root `package.json`; the backend is its own package in `server/package.json`, with its own dependencies and lockfile, so it can be installed, run, and deployed without the frontend. The root scripts below just delegate into it — `npm start` runs `cd server && npm start`.

### Development — `npm run dev`

The normal way to work on the app. One command starts **both** processes with hot reload:

```bash
npm run dev
```

```
[api]  2026-08-05T07:38:41.048Z INFO  threadline API v1.1.0 listening {"url":"http://localhost:8787"}
[web]  ➜  Local:   http://localhost:5173/
```

| | |
| --- | --- |
| **Open this** | <http://localhost:5173> — the Vite dev server (opens automatically) |
| Backend | <http://localhost:8787> — Vite proxies every `/api` call here |
| Stop | `Ctrl+C` (stops both) |

Editing `src/` hot-reloads the browser; editing `server/` restarts the API by itself (`node --watch`).

> **Don't open :8787 during development** — it has no `dist/` build to serve, so you'll get a JSON 404. Use :5173.

### Production — `npm start`

Build once, then run a single process that serves the API *and* the built frontend on one port:

```bash
npm run build                    # typecheck + build into dist/
NODE_ENV=production npm start    # → http://localhost:8787
```

Or in one step: `npm run serve`.

Here you open **<http://localhost:8787>** — there is no separate frontend server.

### Server only

If the frontend is already built (or you only want the API):

```bash
npm start              # normal
npm run dev:server     # with auto-restart on file changes
```

Or work inside the backend package directly — nothing in `server/` needs the root install:

```bash
cd server
npm install            # only express, cors, compression, dotenv, express-rate-limit
npm start              # → http://localhost:8787
npm run dev            # with auto-restart (node --watch)
```

It reads `server/.env` if there is one, otherwise the repo-root `.env`, so the key works from either directory. It serves `server/dist` if you copy a build next to it, otherwise the repo's `dist/`; with neither it runs API-only.

### Check it's up

```bash
curl http://localhost:8787/api/health
# {"status":"ok","openaiConfigured":true,...}
```

`openaiConfigured: false` means the key isn't loaded — check `.env` and restart. The UI still renders fine without a key; only the generation buttons will fail (with a `503` and a clear message).

### All scripts

Root package (`package.json`) — frontend plus delegating wrappers:

| Script | What it does |
| --- | --- |
| `npm run dev` | **API + frontend together**, both with hot reload → :5173 |
| `npm start` | Backend only, serving `dist/` + `/api` → :8787 (runs `server`'s `start`) |
| `npm run serve` | `build` then `start` — the production app in one command |
| `npm run build` | Typecheck (`tsc -b`) then build the frontend into `dist/` |
| `npm run dev:server` | API only, with auto-restart (runs `server`'s `dev`) |
| `npm run dev:web` | Vite dev server only (API calls will fail) |
| `npm run typecheck` | Typecheck without building |
| `postinstall` | Installs `server/`'s dependencies after a root `npm install` |

Backend package (`server/package.json`) — run from inside `server/`:

| Script | What it does |
| --- | --- |
| `npm start` | `node index.js` |
| `npm run dev` | `node --watch index.js` — auto-restart on backend changes |

### Troubleshooting

| Symptom | Cause |
| --- | --- |
| `EADDRINUSE: 8787` | Something's already on the port — stop it, or set `PORT=8788` in `.env` (the dev proxy follows it) |
| "Could not reach the generation API" | The backend isn't running. Use `npm run dev`, not `npm run dev:web`. |
| `503 OPENAI_API_KEY is not set` | No `.env`, or the key was added after the server started — restart it |
| JSON 404 in the browser | You opened :8787 in development. Use :5173, or run `npm run build` first. |

---

## Configuration

**`OPENAI_API_KEY` is the only variable you need.** These three are optional and rarely changed:

| Variable | Default | Purpose |
| --- | --- | --- |
| `OPENAI_API_KEY` | — | **Required** for generation. Missing → the two generation routes return `503`. |
| `PORT` | `8787` | Backend port. The Vite dev proxy follows it automatically. |
| `HOST` | `0.0.0.0` | Bind address. `127.0.0.1` to refuse connections from other machines. |
| `NODE_ENV` | `development` | Set to `production` on a server: enables asset caching, hides stack traces. |
| `LOG_LEVEL` | `info` | `debug` \| `info` \| `warn` \| `error` |

Everything else — timeouts, allowed models, rate limits, CORS, body size — is a named **constant** at the bottom of [`server/config.js`](server/config.js), not an environment variable. They're grouped and commented in one place; edit them there on the rare occasion you need to. Keeping them out of the environment means deploying is a one-secret job and there's no drift between what's set on a host and what the code expects.

---

## API reference

### `POST /api/generate`

```jsonc
// request
{
  "model": "gpt-4o-mini",          // optional, must be in the text allow-list
  "temperature": 0.7,              // optional, clamped to 0–2
  "max_tokens": 400,               // optional, clamped to 1–4000
  "messages": [                    // required, non-empty
    { "role": "system", "content": "You are Threadline…" },
    { "role": "user",   "content": "Write the Instagram feed caption." }
  ]
}
```

Responds with OpenAI's Chat Completions payload verbatim; read `choices[0].message.content`.

### `POST /api/image`

```jsonc
// request
{
  "prompt": "A 1990s-inspired denim editorial…",  // required
  "model": "gpt-image-1",                         // optional
  "size": "1024x1024",                            // 1024x1024 | 1024x1536 | 1536x1024 | auto
  "quality": "medium",                            // low | medium | high | auto
  "n": 1                                          // 1–4
}
```

Responds with OpenAI's Images payload verbatim; read `data[0].b64_json`.

### `GET /api/health`

```json
{
  "status": "ok",
  "service": "threadline",
  "version": "1.1.0",
  "environment": "production",
  "uptimeSeconds": 128,
  "openaiConfigured": true,
  "models": { "text": ["gpt-4o-mini", "…"], "image": ["gpt-image-1"] }
}
```

### Errors

Every failure returns `{ "error": "<human-readable message>" }`, except upstream OpenAI errors, which pass through in OpenAI's `{ "error": { "message": … } }` shape. `src/api.ts` handles both.

| Status | Meaning |
| --- | --- |
| `400` | Validation failed (bad model, empty prompt, malformed JSON, prompt too long) |
| `404` | Unknown `/api/*` route — always JSON, never the SPA shell |
| `405` | Wrong HTTP method; includes an `Allow` header |
| `413` | Request body larger than 1 MB |
| `429` | Rate limit exceeded |
| `4xx`/`5xx` | Passed through from OpenAI (e.g. `401` bad key, `429` quota) |
| `502` | OpenAI unreachable or returned non-JSON |
| `503` | `OPENAI_API_KEY` not set on the server |
| `504` | OpenAI exceeded the configured timeout |

---

## Project structure

```
├── server/                     Node.js + Express backend — its own npm package
│   ├── package.json            backend deps + start/dev scripts (own lockfile)
│   ├── index.js                entry point — listen, timeouts, graceful shutdown
│   ├── app.js                  app factory — middleware, /api mount, SPA hosting
│   ├── config.js               all env parsing, validated and frozen
│   ├── routes/
│   │   ├── index.js            /api router + rate limiting
│   │   ├── generate.js         POST /api/generate
│   │   ├── image.js            POST /api/image
│   │   └── health.js           GET  /api/health
│   ├── middleware/
│   │   ├── errorHandler.js     terminal handler → { error: string }
│   │   ├── requestLogger.js    one line per request
│   │   └── securityHeaders.js  nosniff, referrer-policy, frame-options
│   └── lib/
│       ├── openai.js           the only module that touches the API key
│       ├── validate.js         request validators
│       ├── http.js             ApiError, asyncHandler, methodNotAllowed
│       └── logger.js           levelled console logger
│
├── src/                        React + TypeScript frontend
│   ├── App.tsx                 app shell + page switching
│   ├── context.tsx             navigation / drawer / toast / generation state
│   ├── api.ts                  client for /api/generate and /api/image
│   ├── generation.ts           system + user prompt construction
│   ├── data.ts                 campaigns, channels, packages, typed IDs
│   ├── icons.tsx               inline SVG icon set
│   ├── style.ts                inline-style string → React style helper
│   ├── index.css               the full design system
│   ├── components/             Sidebar, Topbar, Drawer, Toast, ImageStudio, primitives
│   ├── pages/                  the 7 global pages + create flows + image viewer
│   └── pages/campaign/         the 11 campaign lifecycle tabs
│
├── public/                     campaign hero imagery
├── dist/                       build output (git-ignored)
├── Dockerfile                  multi-stage build → single SPA + API image
├── vite.config.ts              frontend build + /api dev proxy
└── .env.example                every supported variable, documented
```

---

## Deployment

The build produces one deployable unit: a Node process that serves both the API and the frontend.

### Any Node host (Render, Railway, Fly, EC2, App Service…)

```bash
npm ci
npm run build
NODE_ENV=production OPENAI_API_KEY=sk-… npm start
```

To deploy the **backend on its own** (frontend hosted elsewhere, or API-only), ship `server/` and run it there — it needs no root install and no build step:

```bash
cd server
npm ci
NODE_ENV=production OPENAI_API_KEY=sk-… npm start
```

Copy a `dist/` build into `server/dist` if you also want that process to serve the SPA. Remember that `NODE_ENV=production` empties `corsOrigins` (same-origin only) — a separately hosted frontend needs its origin added in `server/config.js`.

Point the platform's health check at `/api/health`. Setting `NODE_ENV=production` also turns on Express' `trust proxy`, so rate limiting sees real client IPs behind a load balancer.

### Docker

```bash
docker build -t threadline .
docker run -p 8787:8787 -e OPENAI_API_KEY=sk-… -e NODE_ENV=production threadline
```

The image is multi-stage (build → runtime), runs as the non-root `node` user, and ships a `HEALTHCHECK` against `/api/health`.

### Split hosting (static CDN + separate API)

If you'd rather host the frontend on a CDN:

1. Deploy `dist/` to the CDN and route `/api/*` to the backend from the CDN's edge — that keeps the frontend's relative URLs working, and the backend needs no changes at all.
2. If you cannot rewrite at the edge, add your frontend's origin to `corsOrigins` in [`server/config.js`](server/config.js) and introduce an API base URL in [`src/api.ts`](src/api.ts).

### Behind nginx

```nginx
location /api/ { proxy_pass http://127.0.0.1:8787;
                 proxy_read_timeout 300s;    # image generation is slow
                 proxy_set_header Host $host;
                 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; }
location /     { proxy_pass http://127.0.0.1:8787; }
```

---

## Migrating from the Netlify build

Earlier versions deployed to Netlify with `netlify/functions/generate.js`, `netlify/functions/image.js` and a `netlify.toml`. Those have been replaced by `server/` and removed.

| Then | Now |
| --- | --- |
| `netlify/functions/generate.js` | `server/routes/generate.js` |
| `netlify/functions/image.js` | `server/routes/image.js` |
| `netlify.toml` redirects | Express routing + SPA fallback in `server/app.js` |
| Vite dev middleware calling OpenAI | Vite proxies `/api` to the same backend used in production |
| Netlify env vars | `.env` locally, platform env vars in production |
| 10–26s function ceiling on images | 180s, set in `server/config.js` |

Nothing changed for the frontend: the endpoints, request bodies and response shapes are identical. The practical differences are that **one code path now serves dev and production** (previously the Vite middleware and the Netlify functions were duplicate implementations that could drift), and that image generation is no longer capped by a platform timeout.

To deploy on Netlify again, host the frontend there and run `server/` as a separate always-on service — serverless functions are a poor fit for multi-minute image requests.

---

## Prototype notes

- Threadline operates *above* Levi's existing tools rather than replacing them.
- Public campaign/product context is combined with clearly synthetic internal operational data.
- Reuse, model routing, source provenance, rights, governance, approval, publishing and learning stay connected through content lineage.
- Humans remain responsible for creative, cultural and high-risk decisions — the UI makes the point of human authorization explicit at each stage.
