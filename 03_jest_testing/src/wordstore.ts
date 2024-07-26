export interface wordstore {
  // number of words stored
  get size(): number

  // add a word
  add(word: string): void

  // contains a word
  contains(word: string): boolean

  // shortest
  shortest(): string

  // longest
  longest(): string

  // find a random word
  random(): string
}
