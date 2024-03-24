/**
 * @interface
 */
interface TodoItem {
  id: number
  title: string
  details: string
  created: Date
  updated: Date
  completed: boolean
}

type NewTodoItem = Pick<TodoItem, 'title' | 'details'>

export class Todo {
  private _id: number = 0
  private _items: Record<number, TodoItem> = {}

  public items(): number {
    return Object.keys(this._items).length
  }

  public add(item: NewTodoItem) {
    const id = this._id
    const todo = {id, ...item, created: new Date(), updated: new Date(), completed: false }
    this._items[id] = todo
    this._id += 1
    return id
  }

  public get(id: number) {
    if (id < 0) {
      throw new RangeError('id is invalid')
    }
    return this._items[id]
  }

  /**
   * Marks a todo item as completed
   */
  public complete(id: number) {
    if (id < 0) {
      throw new RangeError('id is invalid')
    }    
    this._items[id].completed = true
  }

  public update(id: number, values: Partial<NewTodoItem>) {
    if (id < 0) {
      throw new RangeError('id is invalid')
    } 
    if (this._items[id].completed) {
      throw new Error('Cannot update a completed item')
    }
    const item = { ...this._items[id], ...values}
    this._items[id] = item
  }
}
