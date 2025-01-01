import { logger } from './logger.js'
import fs from 'fs'
import path from 'path'

export function saveAsCsv(trades: any[], filepath: string) {

    const outBasePath = path.dirname(filepath)
    if (!fs.existsSync(outBasePath)) {
      logger.info({ outBasePath: outBasePath })
      fs.mkdirSync(outBasePath, { recursive: true })
    }

    const csv = trades.map((trade) => {
        return `${trade.type},${trade.id},${trade.value},${trade.email},${trade.name},${trade.at.toISOString()}`
    }).join('\n')

    fs.writeFileSync(filepath, csv)
}
