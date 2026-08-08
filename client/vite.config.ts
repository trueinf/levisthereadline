import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Frontend build/dev config.
 *
 * The OpenAI key never lives here. In development Vite proxies every /api call
 * to the Node/Express backend in `server/` (started by `npm run dev` alongside
 * this dev server); in production that same backend serves `dist/` directly, so
 * the app talks to /api on its own origin either way.
 */
export default defineConfig(({ mode }) => {
  // Follow PORT from .env so the proxy still finds the backend if you move it.
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = `http://localhost:${env.PORT || 8787}`

  return {
    plugins: [react()],
    server: {
      port: 5173,
      open: true,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          // Image generation can take well over a minute.
          timeout: 300_000,
          proxyTimeout: 300_000,
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
    },
  }
})
