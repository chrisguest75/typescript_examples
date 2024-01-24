import * as path from 'path';
import * as fs from 'fs';

const logger = {
    debug : (msg:string, map = {}) => { console.log(`debug: ${msg} ${JSON.stringify(map)}`) },
    info : (msg:string, map = {}) => { console.log(`debug: ${msg}, ${JSON.stringify(map)}`) },
    error : (msg:string, map = {}) => { console.log(`error: ${msg}, ${JSON.stringify(map)}`) }
}

export interface FileProcessor {
    process(fullPath: string): void
}

class fileCallback implements FileProcessor {
    process(msg:string) { 
        console.log(msg) 
    }
}
const fp = new fileCallback()

async function findSync(folder: string, pattern: string, recurse: boolean, processor: FileProcessor): Promise<number> {
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
                        logger.info(fullpath, { directory: directory })
                    }
                } else {
                    if (path.basename(fullpath).match(pattern)) {
                        logger.info('Processing file', { function: 'findSync', file: fullpath })
                        await processor.process(fullpath)
                        count++
                    } else {
                        logger.debug('No pattern match', { file: fullpath, pattern: pattern })
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


findSync('./', '.*', false, fp)

