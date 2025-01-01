import {
    randNumber,
    randBetweenDate,
    randUuid,
    randEmail,
    randFullName,
    randBoolean,
} from '@ngneat/falso'

export type TradeEvent = {
    type: 'buy' | 'sell',
    id: string,
    value: number,
    email: string,
    name: string,
    sold: Date,
  }

function addDays(startDate: Date, days: number) {
    const result = new Date(startDate)
    result.setDate(result.getDate() + days)
    return result
}

export function fakeTrades(sales: number = 20): TradeEvent[] {
    const fakedSales: Array<TradeEvent> = []

    for (let i = 0; i < sales; i++) {
        const soldDate = randBetweenDate({ from: new Date('01/01/2024'), to: addDays(new Date(), +10) })
        const sale: TradeEvent = {
            type: randBoolean() ? 'sell' : 'buy',
            id: randUuid(),
            value: randNumber({ min: 5, max: 250 }),
            email: randEmail(),
            name: randFullName(),
            sold: soldDate,
        }

        fakedSales.push(sale)
    }

    return fakedSales
}
