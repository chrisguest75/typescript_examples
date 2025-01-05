import { logger } from './logger.js'
import fs from 'fs'
import path from 'path'

/**
 * Save the objects as a CSV file. Create the directory if it does not exist.
 * @param objects The list of objects to save as CSV.
 * @param filepath The path to save the CSV file.
 */
export function saveAsCsv(objects: any[], filepath: string) {
  const outBasePath = path.dirname(filepath)
  if (!fs.existsSync(outBasePath)) {
    logger.info({ outBasePath: outBasePath })
    fs.mkdirSync(outBasePath, { recursive: true })
  }

  const csv = objects
    .map((trade) => {
      let row = ''
      Object.keys(trade).forEach((key) => {
        if (trade[key] instanceof Date) {
          row = row + `,${trade[key].toISOString()}`
        } else {
          row = row + `,${trade[key]}`
        }
      })

      return row
    })
    .join('\n')

  fs.writeFileSync(filepath, csv)
}
