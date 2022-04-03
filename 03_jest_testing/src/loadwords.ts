import { readFileSync } from 'fs'

export class loadwords {
  words: string[] = []

  constructor(path: string) {
    try {
      const data = readFileSync(path, { encoding: 'utf8', flag: 'r' })
      //console.log(data)
      const words = data.split('\n')
      //console.log(this.words)
      for (const word of words) {
        if (word.length > 0) {
          this.words.push(word)
        }
      }
    } catch (err) {
      if (typeof err === 'string') {
        throw Error(err)
      } else {
        throw Error('File load error')
      }
    }
  }
}
