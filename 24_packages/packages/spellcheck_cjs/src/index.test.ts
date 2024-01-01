import { greet } from './index'

test('empty test', () => {
  // ARRANGE
  const a = 0
  // ACT

  // ASSERT
  expect(greet('Chris')).toBe('Hello, Chris!')
})
