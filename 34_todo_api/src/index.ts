import { logger } from './logger.js'
import * as dotenv from 'dotenv'
import minimist from 'minimist'

/*
Entrypoint
*/
export async function main(args: minimist.ParsedArgs) {
  logger.trace('TRACE - level message')
  logger.debug('DEBUG - level message')
  logger.info('INFO - level message')
  logger.warn('WARN - level message')
  logger.error('ERROR - level message')
  logger.fatal('FATAL - level message')
  logger.info({ node_env: process.env.NODE_ENV })
  logger.info({ 'node.version': process.version })

  if (args['throwError']) {
    throw new Error("I'm an error")
  }
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
  string: ['ssmName'],
  boolean: ['verbose', 'ssmRead', 'ssmWrite', 'throwError'],
  default: { verbose: true, throwError: false, ssmRead: false, ssmWrite: false, ssmName: 'testssmdocument' },
})

try {
  await main(args)
  process.exit(0)
} catch (error) {
  logger.error(error)
  process.exit(1)
}
