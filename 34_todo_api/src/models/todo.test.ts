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

test('Get items throws if id does not exist', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  const id = todo.add({
    title: 'Go shopping',
    details: 'Get milk'
  })
  // ASSERT
  expect(todo.items()).toBe(1)
  expect(() => {
    todo.get(-1)
  }).toThrow(RangeError);
})

test('Items can be marked complete', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  const id = todo.add({
    title: 'Go shopping',
    details: 'Get milk'
  })
  todo.complete(id)
  // ASSERT
  expect(todo.items()).toBe(1)
  expect(todo.get(id)).toMatchObject({id, title: 'Go shopping', details: 'Get milk', completed: true})
})

test('Complete item throws if id does not exist', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  const id = todo.add({
    title: 'Go shopping',
    details: 'Get milk'
  })
  // ASSERT
  expect(todo.items()).toBe(1)
  expect(() => {
    todo.complete(-1)
  }).toThrow(RangeError);
})

test('Items can be updated', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  const id = todo.add({
    title: 'Go shopping',
    details: 'Get milk'
  })
  todo.update(id, { details: 'Get beans'})
  // ASSERT
  expect(todo.get(id)).toMatchObject({id, title: 'Go shopping', details: 'Get beans', completed: false})
  // ACT
  todo.update(id, { title: 'Go to shops'})
  // ASSERT
  expect(todo.get(id)).toMatchObject({id, title: 'Go to shops', details: 'Get beans', completed: false})
})

test('Items marked as complete cannot be updated', () => {
    // ARRANGE
    const todo = new Todo()
    // ACT
    const id = todo.add({
      title: 'Go shopping',
      details: 'Get milk'
    })
    todo.update(id, { details: 'Get beans'})
    todo.complete(id)
    // ASSERT
    expect(todo.get(id)).toMatchObject({id, title: 'Go shopping', details: 'Get beans', completed: true})
    expect(() => {
      todo.update(id, { title: 'Go to shops'})
    }).toThrow(Error);  
})

test('Update item throws if id does not exist', () => {
  // ARRANGE
  const todo = new Todo()
  // ACT
  const id = todo.add({
    title: 'Go shopping',
    details: 'Get milk'
  })
  // ASSERT
  expect(todo.items()).toBe(1)
  expect(() => {
    todo.update(-1, { details: 'Get beans'})
  }).toThrow(RangeError);
})