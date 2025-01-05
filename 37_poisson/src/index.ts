import { logger } from './logger'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import { fakeTrades, TradeEvent } from './trades'
import { saveAsCsv } from './csv'
import { saveAsJson } from './json'
import { Stock } from './stock'

/**
 * aggregate trades
 * calculate averages, min, max, counts
 * @param trades
 * @returns
 */
function aggregateTrades(trades: TradeEvent[]) {
  const aggregated = trades.reduce(
    (acc, trade) => {
      if (trade.type === 'buy') {
        acc.buy += trade.value
        acc.numBuys++
        if (acc.minBuy == 0 || trade.value < acc.minBuy) {
          acc.minBuy = trade.value
        }
        if (trade.value > acc.maxBuy) {
          acc.maxBuy = trade.value
        }
      } else {
        acc.sell += trade.value
        acc.numSells++
        if (acc.minSell == 0 || trade.value < acc.minSell) {
          acc.minSell = trade.value
        }
        if (trade.value > acc.maxSell) {
          acc.maxSell = trade.value
        }
      }
      acc.profit = acc.sell - acc.buy
      return acc
    },
    {
      buy: 0,
      sell: 0,
      numTrades: trades.length,
      numBuys: 0,
      numSells: 0,
      minSell: 0,
      maxSell: 0,
      minBuy: 0,
      maxBuy: 0,
      avgBuy: 0,
      avgSell: 0,
      profit: 0,
    },
  )

  // calculate averages to 3 given decimal places
  aggregated.avgBuy = aggregated.buy / aggregated.numBuys
  aggregated.avgSell = aggregated.sell / aggregated.numSells

  aggregated.avgBuy = Math.round(aggregated.avgBuy * 1000) / 1000
  aggregated.avgSell = Math.round(aggregated.avgSell * 1000) / 1000

  return aggregated
}

/**
 * group trades by day
 * @param trades
 * */
function groupTradesByDay(trades: TradeEvent[]) {
  const grouped = trades.reduce(
    (acc, trade) => {
      const day = trade.at.toISOString().split('T')[0]
      if (!acc[day]) {
        acc[day] = []
      }
      acc[day].push(trade)
      return acc
    },
    {} as Record<string, TradeEvent[]>,
  )

  return grouped
}

/**
 * Generate trades
 * @param numberOfTrades
 */
function generateTrades(numberOfTrades: number) {
  const stock = new Stock()
  const trades = fakeTrades(stock, numberOfTrades)

  trades.forEach((trade) => {
    logger.info(trade)
  })

  logger.info(`${trades.length} trades generated`)

  // save as csv
  saveAsCsv(trades, 'out/trades.csv')
  saveAsJson(trades, 'out/trades.json')

  const aggregated = aggregateTrades(trades)
  logger.info(aggregated)

  const grouped = groupTradesByDay(trades)
  logger.info(grouped)

  for (const [day, trades] of Object.entries(grouped)) {
    const aggregated = aggregateTrades(trades)
    //logger.info(aggregated)
    logger.info(
      `Day: ${day} - ${aggregated.numTrades} trades, ${aggregated.numBuys} buys, ${aggregated.numSells} sells, avg buy: ${aggregated.avgBuy}, avg sell: ${aggregated.avgSell} min sell: ${aggregated.minSell}, max sell: ${aggregated.maxSell}, min buy: ${aggregated.minBuy}, max buy: ${aggregated.maxBuy}, profit: ${aggregated.profit}`,
    )
  }

  logger.info(`Stock Value: ${stock.totalValue()}`)
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
  boolean: ['verbose', 'trades'],
  default: { verbose: true, trades: false, total: '10' },
})

try {
  await main(args)
  process.exit(0)
} catch (error) {
  logger.error(error)
  process.exit(1)
}
