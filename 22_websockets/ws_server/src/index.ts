import { logger } from './logger'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import * as readlineSync from 'readline-sync'
import { WebSocketServer } from 'ws'

/*
main
*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function main(args: minimist.ParsedArgs) {
  logger.trace('TRACE - level message')
  logger.debug('DEBUG - level message')
  logger.info('INFO - level message')
  logger.warn('WARN - level message')
  logger.error('ERROR - level message')
  logger.fatal('FATAL - level message')

  const wss = new WebSocketServer({ port: 40000 })
  wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
      logger.info('received: %s', data)
    })

    ws.send('something')
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    readlineSync.question('Quit?')
    logger.info('Finishing')
    resolve('Complete')
  })
}

/*
Entrypoint
*/
// load config
dotenv.config()
logger.info(`Pino:${logger.version}`)
const args: minimist.ParsedArgs = minimist(process.argv.slice(2))
main(args)
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    logger.error(e)
    process.exit(1)
  })

/*
import { createClient } from 'redis';

(async () => {
  const client = createClient(
    {
      url: 'redis://0.0.0.0:6379'
    }
  );

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  await client.set('key', 'myvalue');
  const value = await client.get('key');
  console.log(`${value}`)
})();
*/