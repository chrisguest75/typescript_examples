import {
  randNumber,
  randUuid,
  randEmail,
  randFullName,
  randBoolean,
} from '@ngneat/falso'
import { logger } from './logger'
import { poissonArrivalGenerator } from './poisson'

export type TradeEvent = {
  type: 'buy' | 'sell'
  id: string
  value: number
  email: string
  name: string
  at: Date
}

/**
 * Generate a list of fake trades.
 * @param trades The number of trades to generate.
 * @returns A list of fake trades.
 */
export function fakeTrades(trades: number = 20): TradeEvent[] {
  const fakedSales: Array<TradeEvent> = []
  const baseTime = new Date()
  const rate = 2.0 // Average x arrivals per timeperiod
  const timePeriod = 60 * 60 * 24 // 1 arrival per day
  const generator = poissonArrivalGenerator(baseTime, rate, timePeriod)

  for (let i = 0; i < trades; i++) {
    const atDate = generator.next().value || new Date()
    const sale: TradeEvent = {
      type: randBoolean() ? 'sell' : 'buy',
      id: randUuid(),
      value: randNumber({ min: 5, max: 150 }),
      email: randEmail(),
      name: randFullName(),
      at: atDate,
    }

    fakedSales.push(sale)
  }

  return fakedSales
}
