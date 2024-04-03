import { Get, Route } from 'tsoa'
// import { Todo } from '../models/todo.js'

interface TodoResponse {
  message: string
}

// limit, skip, filter
// GET todo/ - returns all todos
// GET todo/{id} - returns a todo
// POST todo - create a todo {}
// PATCH todo/{id} - update todo

@Route('todo')
export class TodoController {
  @Get('/')
  public async getTodo(): Promise<TodoResponse> {
    return {
      message: 'todo',
    }
  }
}
