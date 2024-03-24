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
  private _items: TodoItem[] = []

  public items(): number {
    return this._items.length
  }

  public add(item: NewTodoItem) {
    const id = 0
    const todo = {id, ...item, created: new Date(), updated: new Date(), completed: false }
    this._items.push(todo)
    return id
  }

  public get(id: number) {
    return this._items[id]
  }
}
