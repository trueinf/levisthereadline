import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'node:http'

/**
 * Dev-only proxy: keeps the OpenAI API key server-side.
 * The browser calls POST /api/generate (text) or /api/image (images); this
 * middleware attaches the key from .env and forwards to OpenAI. The key is
 * never exposed to the client bundle.
 */
function openaiProxy(getKey: () => string | undefined): Plugin {
  const forward =
    (endpoint: string, transform: (body: any) => unknown) =>
    async (req: IncomingMessage, res: ServerResponse) => {
      const send = (status: number, obj: unknown) => {
        res.statusCode = status
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify(obj))
      }
      if (req.method !== 'POST') return send(405, { error: 'Method not allowed' })
      try {
        const apiKey = getKey()
        if (!apiKey) {
          return send(400, {
            error: 'OPENAI_API_KEY is not set. Add it to a .env file in the project root and restart the dev server.',
          })
        }
        const chunks: Uint8Array[] = []
        for await (const chunk of req) chunks.push(chunk as Uint8Array)
        const body = JSON.parse(Buffer.concat(chunks).toString() || '{}')

        const upstream = await fetch(endpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
          body: JSON.stringify(transform(body)),
        })
        const data = await upstream.json()
        send(upstream.status, data)
      } catch (err) {
        send(500, { error: err instanceof Error ? err.message : String(err) })
      }
    }

  return {
    name: 'threadline-openai-proxy',
    configureServer(server) {
      server.middlewares.use(
        '/api/generate',
        forward('https://api.openai.com/v1/chat/completions', (b) => ({
          model: b.model || 'gpt-4o-mini',
          messages: b.messages || [],
          temperature: b.temperature ?? 0.7,
          max_tokens: b.max_tokens ?? 400,
        })),
      )
      server.middlewares.use(
        '/api/image',
        forward('https://api.openai.com/v1/images/generations', (b) => ({
          model: b.model || 'gpt-image-1',
          prompt: b.prompt,
          size: b.size || '1024x1024',
          quality: b.quality || 'medium',
          n: 1,
        })),
      )
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), openaiProxy(() => env.OPENAI_API_KEY || process.env.OPENAI_API_KEY)],
    server: {
      port: 5173,
      open: true,
    },
  }
})
