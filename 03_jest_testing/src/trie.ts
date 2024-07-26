import { wordstore } from './wordstore'

// TODO:
// Docuentation in comments
// Linting?
// Work out how to remove infectious undefined.
// github actions run the jest tests

class trie_node {
  // a map of characters to child nodes
  nodes: Map<string, trie_node> = new Map<string, trie_node>()
  private _endWord = false

  get endWord(): boolean {
    return this._endWord
  }

  set endWord(endWord: boolean) {
    this._endWord = endWord
  }

  // add a word and return the child node
  add(word: string): boolean {
    // add only if word has letters
    if (word.length > 0) {
      const letter = word.slice(0, 1)
      const slice = word.slice(1)
      let child = new trie_node()
      if (!this.nodes.has(letter)) {
        // if the letter does not exists we add it
        if (slice.length == 0) {
          // if end of word signal it
          child.endWord = true
        }
        this.nodes.set(letter, child)
      } else {
        child = this.nodes.get(letter) || new trie_node()
        // if no more to add and already end of word we haven't added word
        if (slice.length == 0 && child.endWord) {
          return false
        }
      }
      // if nothing to add we've done our work
      if (slice.length == 0) {
        return true
      }
      return child.add(slice)
    }
    // should not get here
    return false
  }

  contains(word: string): boolean {
    if (word.length == 1) {
      // if word is a single letter we just check it exists
      const child = this.nodes.get(word)
      if (child == undefined) {
        return false
      }
      return child.endWord
    } else {
      // descend through trie
      const letter = word.slice(0, 1)
      if (this.nodes.has(letter)) {
        const x = this.nodes.get(letter) || new trie_node()
        return x.contains(word.slice(1))
      } else {
        return false
      }
    }
  }
}

export class trie implements wordstore {
  // number of words stored in the trie
  private _size: number
  private _shortest: string
  private _longest: string

  // root of the trie
  private nodes: trie_node = new trie_node()

  constructor() {
    this._size = 0
    this._shortest = ""
    this._longest = ""
  }

  public get size(): number {
    return this._size
  }

  // add a word
  public add(word: string) {
    // add only if word has letters
    if (this.nodes.add(word)) {
      // determine longest and shortest
      if (this._size == 0 || word.length < this._shortest.length) {
        this._shortest = word
      }
      if (this._size == 0 || word.length > this._longest.length) {
        this._longest = word
      }
      this._size++
    }
  }

  // does the trie contain a word
  public contains(word: string): boolean {
    if (word.length > 0) {
      return this.nodes.contains(word)
    } else {
      // words with no letters do not exist
      return false
    }
  }

  // find a shortest word
  public shortest(): string {
    return this._shortest
  }

  // find a longest word
  public longest(): string {
    return this._longest
  }

  // generate a random word
  // This has issues with equal weighting given to each letter.
  // Also as soon as a end word is met it will quit potentially hiding other longer words. 
  public random(): string {
    let current = this.nodes
    
    let word = ""
    let stop = false
    while (!stop) {
      const index = Math.floor(Math.random() * current.nodes.size)
      let node = Array.from(current.nodes)[index]
      word = word + node[0]
      stop = node[1].endWord
      current = node[1]
    }
    return word
  }  
}
