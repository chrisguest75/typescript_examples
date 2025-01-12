import { randNumber } from '@ngneat/falso'
import { Stock } from '../src/stock'
import { createRandomItem } from '../src/stockitem'

describe.only('Manage stock', () => {
  test('No stock on construction', () => {
    // ARRANGE
    const stock = new Stock()
    // ACT
    // ASSERT
    expect(stock.count).toBe(0)
  })

  test('Adding stock increases count', () => {
    // ARRANGE
    const stock = new Stock()
    // ACT
    stock.add(createRandomItem(randNumber({ min: 5, max: 40 })))
    // ASSERT
    expect(stock.count).toBe(1)
  })

  test('Taking stock when none throws exception', () => {
    // ARRANGE
    const stock = new Stock()
    // ACT
    // ASSERT
    expect(() => {
      const taken = stock.take()
    }).toThrow(Error)    
  })

  test('Taking stock decreases count', () => {
    // ARRANGE
    const stock = new Stock()
    // ACT
    const item1 = createRandomItem(randNumber({ min: 5, max: 40 }))
    stock.add(item1)
    const item2 = createRandomItem(randNumber({ min: 5, max: 40 }))
    stock.add(item2)

    const taken = stock.take()

    // ASSERT
    expect(stock.count).toBe(1)
    expect(item2).toEqual(taken)
  })

  test('Get total value of stock', () => {
    // ARRANGE
    const stock = new Stock()
    // ACT
    const item1 = createRandomItem(30)
    stock.add(item1)
    const item2 = createRandomItem(50)
    stock.add(item2)

    const taken = stock.take()

    // ASSERT
    expect(stock.count).toBe(1)
    expect(stock.totalValue()).toEqual(30)
  })
})
