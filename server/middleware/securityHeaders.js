/**
 * Minimal hardening headers. Deliberately not a full CSP: the prototype renders
 * heavy inline styles (see src/style.ts), which a default CSP would block.
 */
export function securityHeaders(req, res, next) {
  res.setHeader('x-content-type-options', 'nosniff')
  res.setHeader('referrer-policy', 'no-referrer')
  res.setHeader('x-frame-options', 'SAMEORIGIN')
  res.setHeader('cross-origin-opener-policy', 'same-origin')
  next()
}
