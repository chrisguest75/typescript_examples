import Find, { FileProcessor } from '../src/find'
import { logger } from '../src/logger'

class ListFiles implements FileProcessor {
    async process(fullPath: string): Promise<string> {
        return new Promise((resolve /*,reject*/) => {
            resolve(fullPath)
        })
    }
}

test('Find files', async () => {
    // ARRANGE
    logger.level = 'info'
    const basePath = '../../ffmpeg_examples/output/ferran-wav-acc-30-minutes-story-wav-decodedaac'
    const files = new ListFiles()
    const find = new Find()

    // ACT
    await find.findSync(basePath, '.*', true, files)
    // ASSERT
    //expect(createdHandler).toHaveBeenCalledTimes(0)
})

