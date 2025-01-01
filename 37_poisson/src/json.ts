import { logger } from './logger.js'
import fs from 'fs'
import path from 'path'

export function saveAsJson(trades: any[], filepath: string) {

    const outBasePath = path.dirname(filepath)
    if (!fs.existsSync(outBasePath)) {
      logger.info({ outBasePath: outBasePath })
      fs.mkdirSync(outBasePath, { recursive: true })
    }

    const json = JSON.stringify(trades, null, 2)

    fs.writeFileSync(filepath, json)
}
