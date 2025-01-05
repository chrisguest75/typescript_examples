import pino from 'pino'

// Create a logger instance
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
})
