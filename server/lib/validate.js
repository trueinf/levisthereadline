// Small hand-rolled request validators. Every failure throws an ApiError(400)
// whose message is safe to show directly in the UI.

import { ApiError } from './http.js'

/** Require a non-empty string, optionally bounded in length. */
export function requireString(value, field, { maxLength } = {}) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new ApiError(400, `\`${field}\` must be a non-empty string.`)
  }
  const trimmed = value.trim()
  if (maxLength && trimmed.length > maxLength) {
    throw new ApiError(400, `\`${field}\` is too long (${trimmed.length} characters, max ${maxLength}).`)
  }
  return trimmed
}

/** Coerce an optional number, clamping into [min, max]. Rejects non-numeric input. */
export function optionalNumber(value, field, { fallback, min, max, integer = false } = {}) {
  if (value == null) return fallback
  const n = Number(value)
  if (!Number.isFinite(n)) throw new ApiError(400, `\`${field}\` must be a number.`)
  const rounded = integer ? Math.trunc(n) : n
  return Math.min(max, Math.max(min, rounded))
}

/** Accept only a value from `allowed`; fall back when the field is omitted. */
export function optionalEnum(value, field, allowed, fallback) {
  if (value == null || value === '') return fallback
  if (typeof value !== 'string' || !allowed.includes(value)) {
    throw new ApiError(400, `Unsupported \`${field}\`: "${value}". Allowed values: ${allowed.join(', ')}.`)
  }
  return value
}

const CHAT_ROLES = ['system', 'user', 'assistant', 'developer']

/** Validate an OpenAI chat `messages` array and strip it to role/content pairs. */
export function requireMessages(value, { maxChars }) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new ApiError(400, '`messages` must be a non-empty array.')
  }
  let total = 0
  const messages = value.map((message, i) => {
    if (message == null || typeof message !== 'object') {
      throw new ApiError(400, `\`messages[${i}]\` must be an object.`)
    }
    if (!CHAT_ROLES.includes(message.role)) {
      throw new ApiError(400, `\`messages[${i}].role\` must be one of: ${CHAT_ROLES.join(', ')}.`)
    }
    if (typeof message.content !== 'string' || message.content.trim() === '') {
      throw new ApiError(400, `\`messages[${i}].content\` must be a non-empty string.`)
    }
    total += message.content.length
    return { role: message.role, content: message.content }
  })
  if (total > maxChars) {
    throw new ApiError(400, `Conversation is too long (${total} characters, max ${maxChars}).`)
  }
  return messages
}
