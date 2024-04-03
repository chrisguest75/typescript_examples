import { Get, Post, Route, Body } from 'tsoa'
import { Todo } from '../models/todo'
import type { TodoItem, NewTodoItem } from '../models/todo'

// limit, skip, filter
// GET todo/ - returns all todos
// GET todo/{id} - returns a todo
// POST todo/ - create a todo {}
// PATCH todo/{id} - update todo

type GetTodoResponse = Array<TodoItem>
type PostTodoResponse = Pick<TodoItem, 'id'>

const todoData = new Todo()

@Route('todo')
export class TodoController {
  @Get('/')
  public async getTodo(): Promise<GetTodoResponse> {
    return todoData.items()
  }

  @Post('/')
  public async postTodo(@Body() body: NewTodoItem): Promise<PostTodoResponse> {
    return { id: todoData.add(body) }
  }
}
