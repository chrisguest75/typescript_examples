import { Todo }  from './todo'

test('empty test', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  // ASSERT
  expect(todo.items()).toBe(0)
})
