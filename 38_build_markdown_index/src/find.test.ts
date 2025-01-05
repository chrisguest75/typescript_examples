import * as fs from 'fs'
import { jest } from '@jest/globals'
import { Find, FileSystem, RealFileSystem } from './find'

describe('Find markdown files', () => {
  test('filter away non .md', () => {
    const include_pattern = /.*\.md$/
    const mockedFiles: Array<string> = ['README.md', 'index.md', 'file.txt']
    const filteredFiles: Array<string> = ['README.md', 'index.md']
    const fs: FileSystem = {
      getPaths: (path: string) => mockedFiles,
    }
    const find = new Find(fs)

    const foundFiles = []
    const generator = find.find('./', include_pattern, [])
    for (const filepath of generator) {
      foundFiles.push(filepath)
    }

    expect(foundFiles).toEqual(filteredFiles)
    expect(foundFiles.length).toBe(filteredFiles.length)
  })

  test('exclude exclusions', () => {
    const include_pattern = /.*\.md$/
    const mockedFiles: Array<string> = ['README.md', 'index.md', 'file.txt', 'node_modules/README.md']
    const filteredFiles: Array<string> = ['README.md', 'index.md']
    const fs: FileSystem = {
      getPaths: (path: string) => mockedFiles,
    }
    const find = new Find(fs)

    const foundFiles = []
    const generator = find.find('./', include_pattern, ['node_modules'])
    for (const filepath of generator) {
      foundFiles.push(filepath)
    }

    expect(foundFiles).toEqual(filteredFiles)
    expect(foundFiles.length).toBe(filteredFiles.length)
  })

  // add .skip to skip the test
  test.skip('simple run RealFileSystem', () => {
    const include_pattern = /.*README\.md$/
    const find = new Find(new RealFileSystem())

    const foundFiles = []
    const generator = find.find('../', include_pattern, ['node_modules', '\/_templates'])
    for (const filepath of generator) {
      foundFiles.push(filepath)
    }

    expect(foundFiles).toEqual([])
  })
})
