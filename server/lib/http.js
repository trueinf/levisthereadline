/** An error with an HTTP status attached — thrown by routes, rendered by errorHandler. */
export class ApiError extends Error {
  constructor(status, message, details) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    if (details !== undefined) this.details = details
  }
}

/** Wrap an async route handler so rejected promises reach Express' error handler. */
export const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/** Respond 405 with a correct `Allow` header. Used as a per-route method fallback. */
export const methodNotAllowed = (...allowed) =>
  (req, res) => {
    res.set('Allow', allowed.join(', '))
    res.status(405).json({ error: `Method ${req.method} not allowed. Use ${allowed.join(' or ')}.` })
  }
