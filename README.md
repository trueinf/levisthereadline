# Threadline

**Levi's Agentic Content Orchestration** — a React + TypeScript prototype of a content operations workspace that sits above existing tools (Workfront, AEM, commerce, TMS, CRM) and connects a global campaign from master brief to local activation.

Converted from the original single-file HTML prototype into a componentized Vite + React 18 + TypeScript application.

## Workspace

**Global**
- Home · Campaign portfolio · Content Library · Approvals · Insights · Agent Activity · Integrations

**Campaign workspace** (11-stage lifecycle)
- Overview · Brief & Intake · Readiness · Assemble · Create · Adapt · Translate · Transcreate · Assure · Activate · Learn

## Getting started

```bash
npm install
npm run dev      # start the Vite dev server
npm run build    # typecheck + production build
npm run preview  # serve the production build
```

## Stack

- Vite 5 · React 18 · TypeScript 5 (strict)
- No runtime UI dependencies — styling is a single hand-authored `src/index.css`

## Project structure

```
src/
  App.tsx            app shell + page routing
  context.tsx        navigation / drawer / toast state
  data.ts            variants, channel packages, typed IDs
  icons.tsx          inline SVG icon set
  style.ts           inline-style string -> React style helper
  index.css          full design system
  components/         Sidebar, Topbar, Drawer, Toast, shared primitives
  pages/             top-level pages
  pages/campaign/    the 11 campaign lifecycle tabs
```

## Prototype notes

- Threadline operates *above* Levi's existing tools rather than replacing them.
- Public campaign/product context is combined with clearly synthetic internal operational data.
- Reuse, model routing, source provenance, rights, governance, approval, publishing and learning stay connected through content lineage.
- Humans remain responsible for creative, cultural and high-risk decisions.
