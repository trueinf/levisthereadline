# Threadline — single image serving both the built SPA and the /api backend.

# ---- build ------------------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app
# Both manifests: the root postinstall installs server/ as well.
COPY package*.json ./
COPY server/package*.json ./server/
RUN npm ci
COPY . .
RUN npm run build

# ---- runtime ----------------------------------------------------------------
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8787
ENV HOST=0.0.0.0

# Runtime only needs the backend package — no frontend toolchain in the image.
COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist
COPY server ./server

USER node
EXPOSE 8787

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:'+(process.env.PORT||8787)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server/index.js"]
