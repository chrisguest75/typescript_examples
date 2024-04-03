/**
 * TodoItem
 * @property id uniqueid for the todo
 * @property title
 * @interface
 */
export interface TodoItem {
  id: number
  title: string
  details: string
  created: Date
  updated: Date
  completed: boolean
}

export type NewTodoItem = Pick<TodoItem, 'title' | 'details'>

export class Todo {
  private _id: number = 0
  private _items: Record<number, TodoItem> = {}

  /**
   * Get the number of items
   */
  public items() {
    return Object.values(this._items)
  }

  /**
   * Add a todo item
   */
  public add(item: NewTodoItem) {
    const id = this._id
    const now = new Date()
    const todo = { id, ...item, created: now, updated: now, completed: false }
    this._items[id] = todo
    this._id += 1
    return id
  }

  /**
   * Get the todo for an id
   */
  public get(id: number) {
    if (id < 0 || !(id in this._items)) {
      throw new RangeError('id is invalid')
    }
    return this._items[id]
  }

  /**
   * Marks a todo item as completed
   */
  public complete(id: number) {
    if (id < 0 || !(id in this._items)) {
      throw new RangeError('id is invalid')
    }
    this._items[id].updated = new Date()
    this._items[id].completed = true
  }

  /**
   * Update fields in a todo
   */
  public update(id: number, values: Partial<NewTodoItem>) {
    if (id < 0 || !(id in this._items)) {
      throw new RangeError('id is invalid')
    }
    if (this._items[id].completed) {
      throw new Error('Cannot update a completed item')
    }
    const item = { ...this._items[id], ...values }
    this._items[id] = item
  }
}
