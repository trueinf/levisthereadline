// Server configuration.
//
// Only OPENAI_API_KEY is required. PORT, HOST, NODE_ENV and LOG_LEVEL are the
// only other things read from the environment — everything under "Tuning" is a
// plain constant, deliberately NOT an env var, so deploying stays a
// one-variable job. Edit them here if you ever need different values.

import dotenv from 'dotenv'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const serverDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(serverDir, '..')

// This folder is its own npm package, so it can be started from anywhere:
// `npm start` inside server/, or `npm start` at the repo root. Resolve .env from
// the files themselves rather than the working directory — server/.env wins if
// you deploy the backend on its own, otherwise the shared root .env is used.
dotenv.config({ path: [path.join(serverDir, '.env'), path.join(repoRoot, '.env')] })

const pkg = JSON.parse(readFileSync(path.join(serverDir, 'package.json'), 'utf8'))

// Built frontend, if there is one. `server/dist` wins when the backend is
// deployed standalone with a build copied next to it; otherwise the repo's dist.
const localDist = path.join(serverDir, 'dist')
const staticDir = existsSync(localDist) ? localDist : path.join(repoRoot, 'dist')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProduction = nodeEnv === 'production'
const port = Number.parseInt(process.env.PORT ?? '', 10) || 8787

export const config = Object.freeze({
  // ---- From the environment ------------------------------------------------
  openaiApiKey: process.env.OPENAI_API_KEY?.trim() || '',
  port,
  host: process.env.HOST || '0.0.0.0',
  nodeEnv,
  isProduction,

  // ---- Identity ------------------------------------------------------------
  name: pkg.name,
  version: pkg.version,

  // ---- Tuning (constants, not env vars) ------------------------------------
  /** Built frontend served in production. */
  staticDir,
  /** Max request body. Prompts are small; this is only an abuse guard. */
  jsonLimit: '1mb',
  /** Dev only: the Vite dev server. In production the API serves the SPA itself. */
  corsOrigins: isProduction ? [] : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  /** Behind a load balancer in production, so rate limiting sees real client IPs. */
  trustProxy: isProduction ? 1 : false,

  openaiBaseUrl: process.env.OPENAI_API_SERVER?.trim() || 'https://api.openai.com/v1',
  openaiBaseImageUrl: process.env.MAI_API_SERVER?.trim() || 'https://api.openai.com/v1',
  /** Text is fast; image generation legitimately runs 10-30s+. */
  textTimeoutMs: 60_000,
  imageTimeoutMs: 180_000,

  /** Allow-lists — the proxy spends a real API key, so keep it bounded. */
  textModels: ['gpt-5.4'],
  imageModels: ['MAI-Image-2.5-pro'],
  defaultTextModel: 'gpt-5.4',
  defaultImageModel: 'MAI-Image-2.5-pro',
  maxOutputTokens: 4000,
  maxPromptChars: 8000,

  /** Generation routes only; /api/health is never limited. */
  rateLimitWindowMs: 60_000,
  rateLimitMax: 30,
})
