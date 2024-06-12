import { logger } from './logger'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import { WebSocketServer } from 'ws'
import { createServer } from 'http'
import express from 'express'
import { createClient } from 'redis'

/*
main
*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function main(args: minimist.ParsedArgs) {
  // logger.trace('TRACE - level message')
  // logger.debug('DEBUG - level message')
  // logger.info('INFO - level message')
  // logger.warn('WARN - level message')
  // logger.error('ERROR - level message')
  // logger.fatal('FATAL - level message')
}

/*
Entrypoint
*/
// load config
dotenv.config()
logger.info(`Pino:${logger.version}`)
const args: minimist.ParsedArgs = minimist(process.argv.slice(2))

const app = express()
//app.use(express.static(path.join(__dirname, '/public')));

const server = createServer(app)
const wss = new WebSocketServer({ server })

const client = createClient({
  url: 'redis://0.0.0.0:6379',
})
client.on('error', (err) => console.log('Redis Client Error', err))

wss.on('connection', function (ws) {
  const id = setInterval(function () {
    ws.send(JSON.stringify(process.memoryUsage()), function () {
      //
      // Ignore errors.
      //
    })
  }, 1000)
  logger.info('started client interval')

  ws.on('close', function () {
    logger.info('stopping client interval')
    clearInterval(id)
  })

  ws.on('message', function (message) {
    logger.info(`${message}`)
    client.connect().then(() => {
      client.set('key', 'myvalue').then(() => {
        client.get('key').then((value) => {
          logger.info(`${value}`)
        })
      })
    })
  })
})

server.listen(8080, function () {
  logger.info('Listening on http://localhost:8080')
})

main(args)
