import path = require('path')
import fs = require('fs')
import { logger } from './logger'

export interface FileProcessor {
    process(fullPath: string): Promise<string>
}
export default class Find {
    // constructor() {}

    async findSync(folder: string, pattern: string, recurse: boolean, processor: FileProcessor) {
        try {
            if (!fs.statSync(folder).isDirectory()) {
                // single file????
                if (path.basename(folder).match(pattern)) {
                    logger.info(`Process single file ${folder}`)
                    await processor.process(folder)
                } else {
                    logger.info(`No pattern match on single file ${folder}`)
                }
            } else {
                const files = fs.readdirSync(folder)

                for (let i = 0; i < files.length; i++) {
                    const file = files[i]
                    const relative = path.join(folder, file)
                    const fullpath = path.resolve(relative)
                    const stat = fs.statSync(fullpath)
                    const directory = stat.isDirectory()
                    if (directory) {
                        if (recurse) {
                            this.findSync(relative, pattern, recurse, processor)
                        } else {
                            logger.child({ directory: directory }).info(fullpath)
                        }
                    } else {
                        if (path.basename(fullpath).match(pattern)) {
                            logger.info(`Process ${fullpath}`)
                            await processor.process(fullpath)
                        } else {
                            logger.info(`No pattern match ${fullpath}`)
                        }
                    }
                }
            }
        } catch (error) {
            logger.error(`Failed to list directory '${folder}'`, error)
            throw error
        }
    }
}
