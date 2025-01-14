import { logger } from './logger.js'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import express from 'express'
import pino from 'express-pino-logger'
import bodyParser from 'body-parser'
import * as socketio from 'socket.io'
import cors from 'cors'
import * as http from 'http'
import { RedisClient } from './redis'

export type EventPayload = {
  counter: number
  message: string
}

/*
Entrypoint
*/
export async function main(args: minimist.ParsedArgs) {
  logger.info({ node_env: process.env.NODE_ENV })
  logger.info({ 'node.version': process.version })

  logger.info(args)

  const port = process.env.PORT || 8000

  const app = express()

  // Use body parser to read sent json payloads
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  )
  app.use(bodyParser.json())
  app.use(express.static('public'))
  app.use(pino())
  app.use(cors())

  const httpserver = http.createServer(app)
  const io = new socketio.Server(httpserver, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  })

  const redisClient = new RedisClient()
  await redisClient.connect(process.env.REDIS_URL || 'redis://0.0.0.0:6379')
  const current = await redisClient.get('current')
  const value = await redisClient.get(current || 'not found')
  logger.info({ current, value })

  let counter = 0
  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.id}`)

    socket.on('payload', async (payload: EventPayload) => {
      logger.info({ ...payload })
      await redisClient.set(payload.counter.toString(), payload.message)
      await redisClient.set('current', payload.counter.toString())

      counter++
      socket.emit('payload_ack', { message: 'payload received', counter: counter })
    })

    socket.on('disconnect', () => logger.info(`User disconnected`))
  })

  logger.info('Starting server...')
  httpserver.listen(port, () => {
    logger.info(`Listening at http://localhost:${port}`)
  })
}

function shutDown(signal: string) {
  return new Promise(() => {
    logger.info(`shutDown - ${signal}`)
    process.exit(0)
  })
}

process.on('SIGTERM', () => {
  shutDown('SIGTERM')
})
process.on('SIGINT', () => {
  shutDown('SIGINT')
})

process.on('exit', async () => {
  logger.warn('exit signal received')
  process.exit(1)
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
  string: ['ssmName'],
  boolean: ['verbose'],
  default: { verbose: true },
})

try {
  await main(args)
  // if we exit, the process will kill the listener
  //process.exit(0)
} catch (error) {
  logger.error(error)
  process.exit(1)
}
