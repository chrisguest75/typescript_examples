import { logger } from './logger.js'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import { fakeTrades } from './trades.js'
import { saveAsCsv } from './csv.js'

function generateTrades(numberOfTrades: number) {
  const trades = fakeTrades(numberOfTrades)
  
  trades.forEach((trade) => {
    logger.info(trade)
  })

  logger.info(`${trades.length} trades generated`)

  // save as csv
  saveAsCsv(trades, 'out/trades.csv')
}

/*
Entrypoint
*/
export async function main(args: minimist.ParsedArgs) {
  // logger.trace('TRACE - level message')
  // logger.debug('DEBUG - level message')
  // logger.info('INFO - level message')
  // logger.warn('WARN - level message')
  // logger.error('ERROR - level message')
  // logger.fatal('FATAL - level message')
  logger.info({ node_env: process.env.NODE_ENV })
  logger.info({ 'node.version': process.version })

  if (args.verbose) {
    logger.level = 'trace'
  }

  if (args.trades) {
    generateTrades(parseInt(args.total, 10))
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
  string: ['total'],
  boolean: ['verbose', 'trades' ],
  default: { verbose: true, trades: false, total: '10' },
})

try {
  await main(args)
  process.exit(0)
} catch (error) {
  logger.error(error)
  process.exit(1)
}
