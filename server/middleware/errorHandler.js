import { ApiError } from '../lib/http.js'
import { config } from '../config.js'
import { log } from '../lib/logger.js'

/**
 * Terminal error handler. Emits the same `{ error: string }` shape the client
 * already understands (see src/api.ts), so failures surface as readable toasts.
 */
// eslint-disable-next-line no-unused-vars -- Express identifies error handlers by arity
export function errorHandler(err, req, res, next) {
  // Malformed JSON body from express.json()
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body is not valid JSON.' })
  }
  if (err?.type === 'entity.too.large') {
    return res.status(413).json({ error: `Request body is too large (max ${config.jsonLimit}).` })
  }

  if (err instanceof ApiError) {
    if (err.status >= 500) log.error(err.message, { status: err.status, path: req.originalUrl })
    return res.status(err.status).json({ error: err.message, ...(err.details ? { details: err.details } : {}) })
  }

  log.error('unhandled error', {
    path: req.originalUrl,
    message: err instanceof Error ? err.message : String(err),
    stack: config.isProduction ? undefined : err?.stack,
  })
  res.status(500).json({
    error: config.isProduction ? 'Internal server error.' : err instanceof Error ? err.message : String(err),
  })
}
