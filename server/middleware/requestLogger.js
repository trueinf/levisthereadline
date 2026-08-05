import { log } from '../lib/logger.js'

/** Log one line per request once the response is finished. */
export function requestLogger(req, res, next) {
  const startedAt = process.hrtime.bigint()
  res.on('finish', () => {
    const ms = Number(process.hrtime.bigint() - startedAt) / 1e6
    log.info(`${req.method} ${req.originalUrl} ${res.statusCode}`, { ms: Math.round(ms) })
  })
  next()
}
