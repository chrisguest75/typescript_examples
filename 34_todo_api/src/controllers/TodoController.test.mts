import { TodoController } from './TodoController'
import type { NewTodoItem } from '../models/todo'

test('Get todo empty items', async () => {
  // ARRANGE
  const todo = new TodoController()
  // ACT
  // ASSERT
  expect(await todo.getTodo()).toHaveLength(0)
})

test('Add a todo item', async () => {
  // ARRANGE
  const todo = new TodoController()

  const item = {
    title: 'test',
    description: 'test',
  } as unknown as NewTodoItem

  // ACT
  expect(await todo.postTodo(item)).toEqual({ id: 0 })

  // ASSERT
  const getTodo = await todo.getTodo()
  expect(getTodo).toHaveLength(1)
  expect(getTodo).toMatchObject([{ id: 0, ...item }])
})
