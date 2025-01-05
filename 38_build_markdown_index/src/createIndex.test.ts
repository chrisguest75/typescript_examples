import { parseMarkdownFile, buildSections } from './createIndex'

describe('Parse markdown', () => {
  test('Grab description', () => {
    const text = `
# Title

This is the description
`
    const fileName = './24_packages/README.md'
    const { title, description } = parseMarkdownFile(fileName, text)
    expect(title).toBe('24 packages')
    expect(description).toBe('This is the description  ')
  })
})

/*describe('Build sections', () => {
  test('', () => {
    const document = buildSections(['../24_packages/README.md'])



  })
})*/

