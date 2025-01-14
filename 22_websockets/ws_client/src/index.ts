import { logger } from './logger'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import { WebsocketClient } from './websocketClient'
import { poissonArrivalGenerator } from './poisson'

type Context = {
  last: Date
  counter: number
}

function sendEvents(generator: Generator, wsClient: WebsocketClient, context: Context) {
  const next = generator.next().value || new Date()
  const interval = next.getTime() - context.last.getTime()
  logger.info(`last ${context.last} next ${next} with interval ${interval}`)
  context.last = next

  wsClient.sendPayload({ counter: context.counter, message: 'hello from the client' })
  context.counter++

  setTimeout(() => {
    sendEvents(generator, wsClient, context)
  }, interval)
}

/*
Entrypoint
*/
export async function main(args: minimist.ParsedArgs) {
  logger.info({ node_env: process.env.NODE_ENV })
  logger.info({ 'node.version': process.version })

  const wsClient = new WebsocketClient(args.ws_url)
  wsClient.connect()

  const baseTime = new Date()
  const rate = 10
  const timePeriod = 30
  const generator = poissonArrivalGenerator(baseTime, rate, timePeriod)
  const context: Context = { last: baseTime, counter: 0 }
  sendEvents(generator, wsClient, context)

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
