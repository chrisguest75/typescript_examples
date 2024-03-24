import { Get, Route } from 'tsoa'
// import { Todo } from '../models/todo.js'

interface TodoResponse {
  message: string
}

// limit, skip, filter
// GET todo/ - returns all todos
// GET todo/{id} - returns a todo

@Route('todo')
export class TodoController {
  @Get('/')
  public async getTodo(): Promise<TodoResponse> {
    return {
      message: 'todo',
    }
  }
}
