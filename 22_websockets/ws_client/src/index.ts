import { logger } from './logger'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import { WebsocketClient } from './websocketClient'

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

  const wsClient = new WebsocketClient(args.ws_url)
  wsClient.connect()

  setInterval(() => {
    wsClient.sendPayload()
  }, 2000)

  setInterval(() => {
    wsClient.sendPing()
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
