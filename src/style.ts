import type { CSSProperties } from 'react'

/**
 * Parse a CSS inline-style string (as used in the original HTML prototype)
 * into a React style object. Lets us port `style="..."` markup faithfully.
 * e.g. s('margin-top:18px;width:72%') -> { marginTop: '18px', width: '72%' }
 */
export function s(style: string): CSSProperties {
  const obj: Record<string, string> = {}
  for (const rule of style.split(';')) {
    const idx = rule.indexOf(':')
    if (idx === -1) continue
    const prop = rule.slice(0, idx).trim()
    const val = rule.slice(idx + 1).trim()
    if (!prop) continue
    // Preserve CSS custom properties as-is; camel-case standard properties.
    const key = prop.startsWith('--')
      ? prop
      : prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
    obj[key] = val
  }
  return obj as CSSProperties
}
