import { logger } from './logger'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import express from 'express'
import pino from 'express-pino-logger'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as http from 'http'
import { WebsocketServer } from './websocketServer'

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

  // Start the server
  const server = new WebsocketServer(httpserver)
  await server.start()

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
