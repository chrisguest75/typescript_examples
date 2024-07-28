---
to: <%= name %>/src/index.test.ts
---
import { greet } from './index'

test('Greets with username provided', () => {
  // ARRANGE
  // ACT
  // ASSERT
  expect(greet('Chris')).toBe('Hello, Chris!')
})
