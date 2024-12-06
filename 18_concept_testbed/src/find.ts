import path = require('path')
import fs = require('fs')
import { logger } from './logger'

export interface FileProcessorSync {
    process(fullPath: string): Promise<string>
}
export interface FileProcessor {
    process(fullPath: string): void
}

export default class Find {
    // constructor() {}

    async findSync(folder: string, pattern: string, recurse: boolean, processor: FileProcessorSync): Promise<number> {
        let count = 0
        try {
            if (!fs.statSync(folder).isDirectory()) {
                // single file????
                if (path.basename(folder).match(pattern)) {
                    logger.debug(`Process single file ${folder}`)
                    await processor.process(folder)
                    count++
                } else {
                    logger.debug(`No pattern match on single file ${folder}`)
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
                            count += await this.findSync(relative, pattern, recurse, processor)
                        } else {
                            logger.child({ directory: directory }).info(fullpath)
                        }
                    } else {
                        if (path.basename(fullpath).match(pattern)) {
                            logger.info({ function: 'findSync', file: fullpath }, `Processing file`)
                            await processor.process(fullpath)
                            count++
                        } else {
                            logger.debug({ file: fullpath, pattern: pattern }, `No pattern match`)
                        }
                    }
                }
            }
        } catch (error) {
            logger.error(`Failed to list directory '${folder}'`, error)
            throw error
        }
        return count
    }

    // async find(folder: string, pattern: string, recurse: boolean, processor: FileProcessor) {
    //     fs.stat(folder, (err, stats) => {
    //         if (!stats.isDirectory()) {
    //             if (path.basename(folder).match(pattern)) {
    //                 logger.debug(`Process single file ${folder}`)
    //                 processor.process(folder)
    //             } else {
    //                 logger.debug(`No pattern match on single file ${folder}`)
    //             }
    //         } else {
    //             fs.readdir(folder, async (err, files) => {
    //                 for (let i = 0; i < files.length; i++) {
    //                     const file = files[i]
    //                     const relative = path.join(folder, file)
    //                     const fullpath = path.resolve(relative)
    //                     fs.stat(fullpath, async (err, stats) => {
    //                         const directory = stats.isDirectory()
    //                         if (directory) {
    //                             if (recurse) {
    //                                 await this.find(relative, pattern, recurse, processor)
    //                             } else {
    //                                 logger.child({ directory: directory }).info(fullpath)
    //                             }
    //                         } else {
    //                             if (path.basename(fullpath).match(pattern)) {
    //                                 logger.info({ function: 'find', file: fullpath }, `Processing file`)
    //                                 processor.process(fullpath)
    //                             } else {
    //                                 logger.debug({ file: fullpath, pattern: pattern }, `No pattern match`)
    //                             }
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //     })
    // }
}
