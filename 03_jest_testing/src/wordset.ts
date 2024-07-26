import { wordstore } from './wordstore'

export class wordset implements wordstore {
  private words = new Set<string>()
  private _shortest: string
  private _longest: string

  constructor() {
    // do nothing
    this._shortest = ""
    this._longest = ""
  }

  public get size(): number {
    return this.words.size
  }

  // add a word
  public add(word: string) {
    if (word.length > 0) {
      if (this.words.size == 0 || word.length < this._shortest.length) {
        this._shortest = word
      }
      if (this.words.size == 0 || word.length > this._longest.length) {
        this._longest = word
      }
      this.words.add(word)
    }
  }

  // does the trie contain a word
  public contains(word: string): boolean {
    return this.words.has(word)
  }

  // find a shortest word
  public shortest(): string {
    return this._shortest
  }

  // find a longest word
  public longest(): string {
    return this._longest
  }

  // find a random word
  public random(): string {
    const index = Math.floor(Math.random() * this.words.size)
    return Array.from(this.words)[index]
  }
}
