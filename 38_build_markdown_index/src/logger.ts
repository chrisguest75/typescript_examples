import pino from 'pino'

/**
 * Logger instance
 */
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
})
