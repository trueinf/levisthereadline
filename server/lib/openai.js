// The only place the OpenAI API key is used. Routes hand this module a path and
// a payload; it attaches auth, enforces a timeout, and returns the upstream
// status plus parsed body so routes can pass OpenAI's own response shape
// straight through to the client.

import { config } from '../config.js'
import { ApiError } from './http.js'
import { log } from './logger.js'

/**
 * POST a JSON payload to the OpenAI API.
 * @param {string} path        e.g. '/chat/completions'
 * @param {object} payload     request body
 * @param {{timeoutMs?: number}} [options]
 * @returns {Promise<{status: number, data: object}>}
 */
export async function callOpenAI(path, payload, { timeoutMs = config.textTimeoutMs } = {}) {
  if (!config.openaiApiKey) {
    throw new ApiError(503, 'OPENAI_API_KEY is not set on the server. Add it to .env and restart the API.')
  }

  const headers = {
    'content-type': 'application/json',
    authorization: `Bearer ${config.openaiApiKey}`,
  }

  const startedAt = process.hrtime.bigint()
  let upstream
  try {
    upstream = await fetch(`${config.openaiBaseUrl}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs),
    })
  } catch (err) {
    if (err?.name === 'TimeoutError' || err?.name === 'AbortError') {
      throw new ApiError(504, `OpenAI did not respond within ${Math.round(timeoutMs / 1000)}s. Try again, or lower the requested quality/size.`)
    }
    throw new ApiError(502, `Could not reach OpenAI: ${err instanceof Error ? err.message : String(err)}`)
  }

  const raw = await upstream.text()
  let data
  try {
    data = raw ? JSON.parse(raw) : {}
  } catch {
    throw new ApiError(502, `OpenAI returned a non-JSON response (HTTP ${upstream.status}).`)
  }

  const ms = Number(process.hrtime.bigint() - startedAt) / 1e6
  log.info('openai call', { path, status: upstream.status, ms: Math.round(ms) })
  if (!upstream.ok) {
    log.warn('openai error', { path, status: upstream.status, message: data?.error?.message })
  }

  return { status: upstream.status, data }
}
