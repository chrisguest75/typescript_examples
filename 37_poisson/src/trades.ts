import {
  randNumber,
  randEmail,
  randFullName,
  randBoolean,
} from '@ngneat/falso'
import { logger } from './logger'
import { poissonArrivalGenerator } from './poisson'
import { Stock } from './stock'
import { createRandomItem } from '../src/stockitem'

export type TradeEvent = {
  type: 'buy' | 'sell'
  id: string
  value: number
  email: string
  name: string
  category: 'electronic' | 'clothing' | 'food' | 'book'
  at: Date
}

/**
 * Generate a list of fake trades.
 * @param trades The number of trades to generate.
 * @returns A list of fake trades.
 */
export function fakeTrades(stock: Stock, trades: number = 20): TradeEvent[] {
  const fakedTrades: Array<TradeEvent> = []
  const baseTime = new Date()
  const rate = 2.0 // Average x arrivals per timeperiod
  const timePeriod = 60 * 60 * 24 // 1 arrival per day
  const generator = poissonArrivalGenerator(baseTime, rate, timePeriod)

  for (let i = 0; i < trades; i++) {
    const atDate = generator.next().value || new Date()
    const tradeType = randBoolean() ? 'sell' : 'buy'

    if (tradeType === 'buy') {
      const buyItem = createRandomItem(randNumber({ min: 5, max: 40 }))
      stock.add(buyItem)
      const buy: TradeEvent = {
        type: tradeType,
        id: buyItem.id,
        value: buyItem.price,
        category: buyItem.category,
        email: randEmail(),
        name: randFullName(),
        at: atDate,
      }
      fakedTrades.push(buy)
    } else {
      if (stock.count === 0) {
        logger.warn('No stock to sell')
        continue
      }
      const sellItem = stock.take()
      const sell: TradeEvent = {
        type: tradeType,
        id: sellItem.id,
        value: sellItem.price + randNumber({ min: 0, max: 40 }),
        category: sellItem.category,
        email: randEmail(),
        name: randFullName(),
        at: atDate,
      }
      fakedTrades.push(sell)
    }
  }

  return fakedTrades
}
