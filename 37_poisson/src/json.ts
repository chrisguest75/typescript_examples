import { logger } from './logger'
import fs from 'fs'
import path from 'path'

/**
 * Save the objects as a JSON file. Create the directory if it does not exist.
 * @param objects A list of objects to save as JSON.
 * @param filepath The path to save the JSON file.
 */
export function saveAsJson(objects: any[], filepath: string) {
  const outBasePath = path.dirname(filepath)
  if (!fs.existsSync(outBasePath)) {
    logger.info({ outBasePath: outBasePath })
    fs.mkdirSync(outBasePath, { recursive: true })
  }

  const json = JSON.stringify(objects, null, 2)

  fs.writeFileSync(filepath, json)
}
