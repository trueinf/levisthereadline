// Express application factory. Kept separate from index.js so tests (or another
// host process) can build the app without binding a port.

import express from 'express'
import cors from 'cors'
import compression from 'compression'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { config } from './config.js'
import apiRouter from './routes/index.js'
import { requestLogger } from './middleware/requestLogger.js'
import { securityHeaders } from './middleware/securityHeaders.js'
import { errorHandler } from './middleware/errorHandler.js'
import { log } from './lib/logger.js'

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  if (config.trustProxy !== false) app.set('trust proxy', config.trustProxy)

  app.use(securityHeaders)
  app.use(requestLogger)
  // Base64 image payloads are large and compress well; so does the SPA bundle.
  app.use(compression())
  app.use(
    cors({
      origin: config.corsOrigins.length > 0 ? config.corsOrigins : false,
      methods: ['GET', 'POST', 'OPTIONS'],
    }),
  )
  app.use(express.json({ limit: config.jsonLimit }))

  app.use('/api', apiRouter)

  // --- SPA hosting ----------------------------------------------------------
  // In production this server is the whole deployment: API + built frontend.
  // In development Vite serves the frontend and proxies /api here, so `dist`
  // simply won't exist and this block is skipped.
  const indexHtml = path.join(config.staticDir, 'index.html')
  if (existsSync(indexHtml)) {
    app.use(
      express.static(config.staticDir, {
        index: false,
        maxAge: config.isProduction ? '1y' : 0,
        setHeaders: (res, filePath) => {
          // Hashed assets are immutable; index.html must never be cached.
          if (filePath.endsWith('index.html')) res.setHeader('cache-control', 'no-cache')
        },
      }),
    )
    app.use((req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') return next()
      if (req.path.startsWith('/api/')) return next()
      res.sendFile(indexHtml)
    })
    log.info('serving built frontend', { dir: config.staticDir })
  } else {
    log.info('no build found — running API only (this is normal with `npm run dev`).')
  }

  app.use((req, res) => {
    res.status(404).json({ error: `Not found: ${req.method} ${req.originalUrl}` })
  })
  app.use(errorHandler)

  return app
}
