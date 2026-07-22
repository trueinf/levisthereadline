// Netlify serverless function: text generation proxy.
// Mirrors the Vite dev middleware so /api/generate works in production.
// Reads OPENAI_API_KEY from the Netlify environment (never exposed to the client).

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
    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: body.model || 'gpt-4o-mini',
        messages: body.messages || [],
        temperature: body.temperature ?? 0.7,
        max_tokens: body.max_tokens ?? 400,
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
