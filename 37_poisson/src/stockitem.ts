import { randNumber,randUuid } from '@ngneat/falso'
import { logger } from './logger'

export type StockItem = {
  id: string
  price: number
  category: 'electronic' | 'clothing' | 'food' | 'book'
}

export function createRandomItem(): StockItem {
  return {
    id: randUuid(),
    price: randNumber({ min: 1, max: 200 }),
    category: ['electronic', 'clothing', 'food', 'book'][randNumber({ min: 0, max: 3 })] as
      | 'electronic'
      | 'clothing'
      | 'food'
      | 'book',
  }
}

export function fakeItems(items: number = 20): StockItem[] {
  const fakedItems: Array<StockItem> = []

  for (let i = 0; i < items; i++) {
    fakedItems.push(createRandomItem())
  }

  return fakedItems
}
