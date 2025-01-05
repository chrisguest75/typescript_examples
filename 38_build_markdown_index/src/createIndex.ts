import { Find, RealFileSystem } from './find'
import { logger } from './logger'
import { marked, Token } from 'marked'
import * as path from 'path'
import * as fs from 'fs'

/**
 * Parse the markdown file
 * @param filename 
 * @param text 
 * @returns 
 */
export function parseMarkdownFile(filename: string, text: string) {
  const matched = filename.match(/(\d+)_(\w+)\//)
  const bit1 = matched?.[1] ?? 'xx'
  const bit2 = matched?.[2] ?? 'unknown'
  const title = `${bit1} ${bit2}`

  let description = ''
  const walkTokens = (token: Token) => {
    if (token.type === 'paragraph') {
      if (description === '') {
        description = token.text
      }
    }
  }

  marked.use({ walkTokens })
  const content = marked.parse(text)
  //logger.info(content)

  description = description.trimEnd() + '  ' 
  return { title, description }
}

/**
 * Build the sections
 * @param foundFiles 
 * @returns 
 */
export function buildSections(foundFiles: Array<string>) {

  const sections = new Map<string, Array<{ title: string, description: string, file: string }>>();

  for (const file of foundFiles) {
    // load the file and get the first line
    // if it starts with a # then use that as the title
    const markdown = fs.readFileSync(file, 'utf8')

    const { title, description } = parseMarkdownFile(file, markdown)

    if(!sections.get(title)) {
      sections.set(title, [])
    }
    sections.get(title)?.push({ title, description, file })
  }

  // create the markdown file
  const lines: Array<string> = []
  sections.forEach((files, title) => {

    lines.push(`## ${title}`)
    lines.push(``)

    for (const { title, description, file } of files) {
      const filename = path.basename(file)
      lines.push(`${description}`)
      lines.push(`[${filename}](${file})  `)
      lines.push(``)
    }
  })
  const document = lines.join('\n');

  return document
}

/**
 * Create the markdown index
 * @param root 
 * @param include 
 */
export function createIndex(root: string, include: RegExp) {
  const find = new Find(new RealFileSystem())

  const foundFiles = []
  const generator = find.find(root, include, ['node_modules', '\/_templates'])
  for (const filepath of generator) {
    foundFiles.push(filepath)
  }

  const document = buildSections(foundFiles)
  
  fs.mkdirSync('./out', { recursive: true })
  const markdownFilePath = path.join('./out', 'index.md')
  fs.writeFileSync(markdownFilePath, document, 'utf8')
}
