// Tiny structured-ish console logger. No dependency, no log framework — the
// output is meant to be readable in a terminal and greppable in a log drain.

const LEVELS = { debug: 10, info: 20, warn: 30, error: 40 }
const threshold = LEVELS[process.env.LOG_LEVEL?.toLowerCase()] ?? LEVELS.info

function emit(level, message, meta) {
  if (LEVELS[level] < threshold) return
  const stamp = new Date().toISOString()
  const tail = meta && Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : ''
  const line = `${stamp} ${level.toUpperCase().padEnd(5)} ${message}${tail}`
  if (level === 'error') console.error(line)
  else if (level === 'warn') console.warn(line)
  else console.log(line)
}

export const log = {
  debug: (message, meta) => emit('debug', message, meta),
  info: (message, meta) => emit('info', message, meta),
  warn: (message, meta) => emit('warn', message, meta),
  error: (message, meta) => emit('error', message, meta),
}
