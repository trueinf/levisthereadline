// API router mounted at /api. The two generation routes are rate limited
// (they spend a real OpenAI key); /api/health is not.

import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { config } from '../config.js'
import generateRouter from './generate.js'
import imageRouter from './image.js'
import healthRouter from './health.js'

const aiLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  limit: config.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: `Too many generation requests. Limit is ${config.rateLimitMax} per ${Math.round(config.rateLimitWindowMs / 1000)}s — wait a moment and try again.`,
  },
})

const router = Router()

router.use('/health', healthRouter)
router.use('/generate', aiLimiter, generateRouter)
router.use('/image', aiLimiter, imageRouter)

// Anything else under /api is a JSON 404, never the SPA shell.
router.use((req, res) => {
  res.status(404).json({ error: `No API route for ${req.method} ${req.originalUrl}` })
})

export default router
