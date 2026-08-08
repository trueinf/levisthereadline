// POST /api/image — image generation proxy (OpenAI images).
// Replaces netlify/functions/image.js. Unlike the Netlify function this has no
// 10-26s platform ceiling: the timeout is ours (IMAGE_TIMEOUT_MS, default 180s),
// so "medium"/"high" quality requests complete instead of being cut off.

import { Router } from 'express'
import { config } from '../config.js'
import { callmai } from '../lib/mai.js'
import { asyncHandler, methodNotAllowed } from '../lib/http.js'
import { optionalEnum, optionalNumber, requireString } from '../lib/validate.js'

const SIZES = ['1024x1024', '1024x1536', '1536x1024', 'auto']
const QUALITIES = ['low', 'medium', 'high', 'auto']

const router = Router()

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const body = req.body ?? {}

    const prompt = requireString(body.prompt, 'prompt', { maxLength: config.maxPromptChars })
    const model = optionalEnum(body.model, 'model', config.imageModels, config.defaultImageModel)
    const size = optionalEnum(body.size, 'size', SIZES, '1024x1024')
    const quality = optionalEnum(body.quality, 'quality', QUALITIES, 'medium')
    const n = optionalNumber(body.n, 'n', { fallback: 1, min: 1, max: 4, integer: true })

    const { status, data } = await callmai(
      '/images/generations',
      { model, prompt, size, quality, n },
      { timeoutMs: config.imageTimeoutMs },
    )

    res.status(status).json(data)
  }),
)

router.all('/', methodNotAllowed('POST'))

export default router
