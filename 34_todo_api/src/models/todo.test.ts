import { Todo } from './todo'

const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))

beforeEach(() => {
  jest.useFakeTimers({
    now: yesterday,
  })
})

test('New todo has empty items', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  // ASSERT
  expect(todo.items().length).toBe(0)
})

test('Items can be added', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  const id1 = todo.add({
    title: 'Go shopping',
    details: 'Get milk',
  })
  const id2 = todo.add({
    title: 'Do code',
    details: 'Write a simple API',
  })
  // ASSERT
  expect(todo.items().length).toBe(2)
  const todo1 = todo.get(id1)
  const todo2 = todo.get(id2)
  expect(todo1.id).not.toBe(todo2.id)
  // we have not modified them so the created and updated should be the same
  expect(todo1.created).toBe(todo1.updated)
  expect(todo1.created).toEqual(yesterday)
})

test('Items can be retrieved by id', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  const id = todo.add({
    title: 'Go shopping',
    details: 'Get milk',
  })
  // ASSERT
  expect(todo.items().length).toBe(1)
  expect(todo.get(id)).toMatchObject({ id, title: 'Go shopping', details: 'Get milk', completed: false })
})

test('Get items throws if id does not exist', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  todo.add({
    title: 'Go shopping',
    details: 'Get milk',
  })
  // ASSERT
  expect(todo.items().length).toBe(1)
  expect(() => {
    todo.get(-1)
  }).toThrow(RangeError)
  expect(() => {
    todo.get(10)
  }).toThrow(RangeError)
})

test('Items can be marked complete', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  const id = todo.add({
    title: 'Go shopping',
    details: 'Get milk',
  })
  jest.advanceTimersByTime(1000)
  todo.complete(id)
  // ASSERT
  expect(todo.items().length).toBe(1)
  const todo1 = todo.get(id)
  expect(todo1).toMatchObject({ id, title: 'Go shopping', details: 'Get milk', completed: true })
  expect(todo1.created).not.toEqual(todo1.updated)
})

test('Complete item throws if id does not exist', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  todo.add({
    title: 'Go shopping',
    details: 'Get milk',
  })
  // ASSERT
  expect(todo.items().length).toBe(1)
  expect(() => {
    todo.complete(-1)
  }).toThrow(RangeError)
  expect(() => {
    todo.complete(10)
  }).toThrow(RangeError)
})

test('Items can be updated', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  const id = todo.add({
    title: 'Go shopping',
    details: 'Get milk',
  })
  todo.update(id, { details: 'Get beans' })
  // ASSERT
  expect(todo.get(id)).toMatchObject({ id, title: 'Go shopping', details: 'Get beans', completed: false })
  // ACT
  todo.update(id, { title: 'Go to shops' })
  // ASSERT
  expect(todo.get(id)).toMatchObject({ id, title: 'Go to shops', details: 'Get beans', completed: false })
})

test('Items marked as complete cannot be updated', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  const id = todo.add({
    title: 'Go shopping',
    details: 'Get milk',
  })
  todo.update(id, { details: 'Get beans' })
  todo.complete(id)
  // ASSERT
  expect(todo.get(id)).toMatchObject({ id, title: 'Go shopping', details: 'Get beans', completed: true })
  expect(() => {
    todo.update(id, { title: 'Go to shops' })
  }).toThrow(Error)
})

test('Update item throws if id does not exist', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  todo.add({
    title: 'Go shopping',
    details: 'Get milk',
  })
  // ASSERT
  expect(todo.items().length).toBe(1)
  expect(() => {
    todo.update(-1, { details: 'Get beans' })
  }).toThrow(RangeError)
  expect(() => {
    todo.update(10, { details: 'Get beans' })
  }).toThrow(RangeError)
})
