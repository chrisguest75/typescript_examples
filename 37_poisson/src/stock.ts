import { logger } from './logger'
import { StockItem } from './stockitem'

export class Stock {
  private _items: Array<StockItem> = []

  constructor() {
    //logger.info(`Stock created: ${name}`)
  }

  public get count(): number {
    return this._items.length
  }

  public add(item: StockItem) {
    this._items.push(item)
  }

  public take(): StockItem {
    if (this.count === 0) {
      throw new Error('No items in stock')
    }
    const item = this._items.pop()
    if (item) {
      return item
    }
    throw new Error('No items in stock')
  }
}
