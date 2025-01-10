import { logger } from './logger.js'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import { Manager } from 'socket.io-client'

/*
Entrypoint
*/
export async function main(args: minimist.ParsedArgs) {
  /*logger.trace('TRACE - level message')
  logger.debug('DEBUG - level message')
  logger.info('INFO - level message')
  logger.warn('WARN - level message')
  logger.error('ERROR - level message')
  logger.fatal('FATAL - level message')*/
  logger.info({ node_env: process.env.NODE_ENV })
  logger.info({ 'node.version': process.version })

  const manager = new Manager(args.ws_url)
  const socket = manager.socket('/')

  socket.on('connect', () => {
    logger.info(`connected ${socket.id}`)
  })

  socket.on('disconnect', () => {
    logger.info(`disconnect`)
  })

  setInterval(() => {
    socket.emit('payload', () => {
      logger.info('payload sent')
    })
  }, 2000)

  setInterval(() => {
    socket.emit('ping', () => {
      logger.info('pong')
    })
  }, 1000)

  logger.info(`waiting for connection ${args.ws_url}`)
  return new Promise(() => {})
}

process.on('exit', async () => {
  logger.warn('exit signal received')
  //process.exit(1)
})

process.on('uncaughtException', async (error: Error) => {
  logger.error(error)
  // for nice printing
  console.log(error)
  process.exit(1)
})

process.on('unhandledRejection', async (reason, promise) => {
  logger.error({
    promise: promise,
    reason: reason,
    msg: 'Unhandled Rejection',
  })
  console.log(reason)
  process.exit(1)
})

// load config
dotenv.config()
logger.info(`Pino:${logger.version}`)
const args: minimist.ParsedArgs = minimist(process.argv.slice(2), {
  string: ['ws_url'],
  boolean: ['verbose'],
  default: { verbose: true, ws_url: 'ws://localhost:8000' },
})

try {
  await main(args)
  process.exit(0)
} catch (error) {
  logger.error(error)
  process.exit(1)
}
