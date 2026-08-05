// GET /api/health — liveness/readiness probe. Never rate-limited, never calls
// OpenAI; it only reports whether the key is present, not what it is.

import { Router } from 'express'
import { config } from '../config.js'

const router = Router()

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: config.name,
    version: config.version,
    environment: config.nodeEnv,
    uptimeSeconds: Math.round(process.uptime()),
    openaiConfigured: Boolean(config.openaiApiKey),
    models: { text: config.textModels, image: config.imageModels },
  })
})

export default router
