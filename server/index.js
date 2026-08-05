#!/usr/bin/env node
// Entry point: `npm start` (production) or `npm run dev:server` (watch mode).

import { createApp } from './app.js'
import { config } from './config.js'
import { log } from './lib/logger.js'

const app = createApp()

const server = app.listen(config.port, config.host, () => {
  log.info(`${config.name} API v${config.version} listening`, {
    url: `http://localhost:${config.port}`,
    env: config.nodeEnv,
    openaiConfigured: Boolean(config.openaiApiKey),
  })
  if (!config.openaiApiKey) {
    log.warn('OPENAI_API_KEY is not set — /api/generate and /api/image will return 503 until it is.')
  }
})

// Image generation can run for minutes; do not cut connections short.
server.requestTimeout = config.imageTimeoutMs + 30_000
server.headersTimeout = server.requestTimeout + 5_000
server.keepAliveTimeout = 65_000

function shutdown(signal) {
  log.info(`${signal} received — shutting down`)
  server.close(() => {
    log.info('server closed')
    process.exit(0)
  })
  // Don't hang forever on in-flight OpenAI calls.
  setTimeout(() => process.exit(1), 10_000).unref()
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
process.on('unhandledRejection', (reason) => {
  log.error('unhandled rejection', { reason: reason instanceof Error ? reason.message : String(reason) })
})
process.on('uncaughtException', (err) => {
  log.error('uncaught exception — exiting', { message: err.message, stack: err.stack })
  process.exit(1)
})
