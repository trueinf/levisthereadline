/**
 * Client helper for content generation. Posts to the dev-server proxy at
 * /api/generate (see vite.config.ts), which forwards to OpenAI with the
 * server-side API key. Returns the generated text, or throws with a
 * human-readable message.
 */
export interface GenerateParams {
  system: string
  user: string
  model?: string
  temperature?: number
  maxTokens?: number
}

export async function generateContent(params: GenerateParams): Promise<string> {
  let res: Response
  try {
    res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        model: params.model,
        temperature: params.temperature,
        max_tokens: params.maxTokens,
        messages: [
          { role: 'system', content: params.system },
          { role: 'user', content: params.user },
        ],
      }),
    })
  } catch {
    throw new Error('Could not reach the generation server. Is the dev server running?')
  }

  let data: any
  try {
    data = await res.json()
  } catch {
    throw new Error(`Unexpected response from the generation server (${res.status}).`)
  }

  if (!res.ok) {
    // Surface OpenAI's error shape { error: { message } } or our proxy's { error }
    const msg = data?.error?.message ?? data?.error ?? `Request failed (${res.status}).`
    throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg))
  }

  const text: string | undefined = data?.choices?.[0]?.message?.content?.trim()
  if (!text) throw new Error('The model returned no content.')
  return text
}

/**
 * Generate an image via the /api/image proxy. Returns a data URL
 * (`data:image/png;base64,...`) so it renders and downloads without expiry.
 */
export async function generateImage(params: { prompt: string; size?: string; model?: string }): Promise<string> {
  let res: Response
  try {
    res = await fetch('/api/image', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ prompt: params.prompt, size: params.size, model: params.model }),
    })
  } catch {
    throw new Error('Could not reach the image server. Is the dev server running?')
  }

  let data: any
  try {
    data = await res.json()
  } catch {
    throw new Error(`Unexpected response from the image server (${res.status}).`)
  }

  if (!res.ok) {
    const msg = data?.error?.message ?? data?.error ?? `Image request failed (${res.status}).`
    throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg))
  }

  const b64: string | undefined = data?.data?.[0]?.b64_json
  if (!b64) throw new Error('No image was returned.')
  return `data:image/png;base64,${b64}`
}
