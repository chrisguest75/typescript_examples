
interface TodoItem {
    id: number
    title: string
    details: string
    created: Date
    updated: Date
    completed: boolean
}

export class Todo {
    private _items: TodoItem[] = []

    public items(): number {
        return this._items.length;
    }  

}