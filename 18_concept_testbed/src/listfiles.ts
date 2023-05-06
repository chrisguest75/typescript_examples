import { logger } from './logger'
import { FileProcessor } from './find'

export default class ListFiles implements FileProcessor {
    async process(fullPath: string): Promise<string> {
        return new Promise((resolve /*,reject*/) => {
            logger.info(`File ${fullPath}`)
            resolve(fullPath)
        })
    }
}
