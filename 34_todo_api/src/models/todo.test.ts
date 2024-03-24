import { Todo } from './todo'


test('New todo has empty items', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  // ASSERT
  expect(todo.items()).toBe(0)
})

test('Items can be added', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  todo.add({
    title: 'Go shopping',
    details: 'Get milk'
  })
  todo.add({
    title: 'Do code',
    details: 'Write a simple API'
  })
  // ASSERT
  expect(todo.items()).toBe(2)
})

test('Items can be retrieved by id', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  const id = todo.add({
    title: 'Go shopping',
    details: 'Get milk'
  })
  // ASSERT
  expect(todo.items()).toBe(1)
  expect(todo.get(id)).toMatchObject({id, title: 'Go shopping', details: 'Get milk', completed: false})

})
