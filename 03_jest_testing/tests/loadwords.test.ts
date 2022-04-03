import { loadwords } from '../src/loadwords'

describe.only('loadwords test', () => {
  test('non existentent file throws', () => {
    // ARRANGE
    // ACT
    // ASSERT
    expect(() => {
      new loadwords('./tests/data/nofile.txt')
    }).toThrow(Error)
  })

  test('empty file', () => {
    // ARRANGE
    const words = new loadwords('./tests/data/emptylines.txt')

    // ACT
    // ASSERT
    expect(words.words).toEqual([])
  })

  test('load file should load rows without empty lines', () => {
    // ARRANGE
    const words = new loadwords('./tests/data/containsempty.txt')

    // ACT
    // ASSERT
    expect(words.words).toEqual(['a', 'is', 'silly', 'this', 'that', 'when'])
  })

  test('load file should load rows', () => {
    // ARRANGE
    const words = new loadwords('./tests/data/fewwords.txt')

    // ACT
    // ASSERT
    expect(words.words).toEqual(['a', 'is', 'silly', 'this', 'that', 'when'])
  })
})
