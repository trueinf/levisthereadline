// POST /api/generate — text generation proxy (OpenAI chat completions).
// Replaces netlify/functions/generate.js. The response body is OpenAI's own
// payload, unchanged, so src/api.ts keeps reading `choices[0].message.content`.

import { Router } from 'express'
import { config } from '../config.js'
import { callOpenAI } from '../lib/openai.js'
import { asyncHandler, methodNotAllowed } from '../lib/http.js'
import { optionalEnum, optionalNumber, requireMessages } from '../lib/validate.js'

const router = Router()

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const body = req.body ?? {}

    const messages = requireMessages(body.messages, { maxChars: config.maxPromptChars })
    const model = optionalEnum(body.model, 'model', config.textModels, config.defaultTextModel)
    const temperature = optionalNumber(body.temperature, 'temperature', { fallback: 0.7, min: 0, max: 2 })
    const maxTokens = optionalNumber(body.max_tokens, 'max_tokens', {
      fallback: 400,
      min: 1,
      max: config.maxOutputTokens,
      integer: true,
    })

    const { status, data } = await callOpenAI(
      '/chat/completions',
      { model, messages, temperature, max_tokens: maxTokens },
      { timeoutMs: config.textTimeoutMs },
    )

    res.status(status).json(data)
  }),
)

router.all('/', methodNotAllowed('POST'))

export default router
