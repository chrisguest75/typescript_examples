import * as fs from 'fs'
import * as path from 'path'
import { logger } from './logger'

/**
 * FileSystem interface
 */
export interface FileSystem {
  getPaths(path: string): Array<string>
}

/**
 * RealFileSystem class
 * Implements FileSystem interface to get paths recursively
 */
export class RealFileSystem implements FileSystem {
  private recurseFolder(folder: string): Array<string> {
    let found: Array<string> = []
    const files = fs.readdirSync(folder)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const relative = path.join(folder, file)
      //let fullpath = path.resolve(relative)
      const fullpath = relative
      const stat = fs.statSync(fullpath)
      const directory = stat.isDirectory()

      if (directory) {
        found = found.concat(this.recurseFolder(relative))
      } else {
        found.push(fullpath)
      }
    }

    return found
  }

  getPaths(path: string): Array<string> {
    return this.recurseFolder(path)
  }
}

/**
 * Find class
 */
export class Find {
  private _fs: FileSystem

  constructor(private fs: FileSystem) {
    this._fs = fs
  }

  /**
   * Find files in a folder with filter and exclusions
   * @param folder 
   * @param include 
   * @param exclusions 
   */
  public *find(folder: string, include: RegExp, exclusions: Array<string> = []): Generator<string> {
    const paths = this._fs.getPaths(folder)

    for (const filepath of paths) {
      if (include.test(filepath)) {
        let exclude = false
        for (const exclusion of exclusions) {
          if (filepath.includes(exclusion)) {
            exclude = true
            continue
          }
        }
        if (!exclude) {
          yield filepath
        }
      }
    }
  }
}
