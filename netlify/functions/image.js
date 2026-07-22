// Netlify serverless function: image generation proxy.
// Mirrors the Vite dev middleware so /api/image works in production.
// Reads OPENAI_API_KEY from the Netlify environment (never exposed to the client).
//
// NOTE: image generation can take 10-30s. Netlify synchronous functions time out
// at 10s on the free tier (configurable up to 26s on paid plans). If images time
// out in production, lower the quality (already defaults to "medium") or raise the
// function timeout in Netlify.

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return json(400, { error: 'OPENAI_API_KEY is not set in the Netlify environment.' })
  }

  try {
    const body = JSON.parse(event.body || '{}')
    const upstream = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: body.model || 'gpt-image-1',
        prompt: body.prompt,
        size: body.size || '1024x1024',
        quality: body.quality || 'medium',
        n: 1,
      }),
    })
    const data = await upstream.json()
    return json(upstream.status, data)
  } catch (err) {
    return json(500, { error: err instanceof Error ? err.message : String(err) })
  }
}

function json(statusCode, obj) {
  return {
    statusCode,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(obj),
  }
}
