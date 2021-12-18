
const fs = require('fs');
const path = require('path');
import { FileInfoResult } from "prettier";
import { logger } from "./logger";

export interface FileProcessor {
    analyse(fullPath: string): Promise<string>;
}
export default class Find {
    constructor() {}

    async findSync(folder: string, pattern: string, recurse: boolean, processor: FileProcessor) {
        
        try {
            if (!fs.statSync(folder).isDirectory()) {
                // single file????
                if (path.basename(folder).match(pattern)) {
                    logger.info(`Process single file ${folder}`)
                    await processor.analyse(folder)                
                } else {
                    logger.info(`No pattern match on single file ${folder}`)
                }
            } else {
                let files = fs.readdirSync(folder)

                for (let i = 0; i < files.length; i++) {
                    let file = files[i]                
                    let relative = path.join(folder, file)
                    let fullpath = path.resolve(relative)
                    let stat = fs.statSync(fullpath);
                    let directory = stat.isDirectory()
                    if (directory) {
                        if (recurse) {
                            this.findSync(relative, pattern, recurse, processor)
                        } else {
                            logger.child({"directory":directory}).info(fullpath)
                        }
                    } else {
                        if (path.basename(fullpath).match(pattern)) {
                            logger.info(`Process ${fullpath}`)
                            await processor.analyse(fullpath)                
                        } else {
                            logger.info(`No pattern match ${fullpath}`)
                        }
                    }
                }    
            }
        }
        catch (error) {
            logger.error(`Failed to list directory '${folder}'`, error)        
            throw error
        }
    }
}