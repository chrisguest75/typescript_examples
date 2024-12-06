import Find, { FileProcessor, FileProcessorSync } from '../src/find'
import { logger } from '../src/logger'

test('Find files synchronously', async () => {
    // ARRANGE
    logger.level = 'info'
    const basePath = './src'
    const find = new Find()

    const mockFileProcessor: FileProcessorSync = {
        process: jest.fn(async (fullPath: string) => {
            return new Promise((resolve /*,reject*/) => {
                resolve(fullPath)
            })
        }),
    }

    // ACT
    const files = await find.findSync(basePath, '.*', true, mockFileProcessor)

    // ASSERT
    expect(mockFileProcessor.process).toHaveBeenCalled()
    expect(mockFileProcessor.process).toHaveBeenCalledTimes(6)
    expect(files).toBe(6)
})

// test('Find files asynchronously', async () => {
//     // ARRANGE
//     logger.level = 'info'
//     const basePath = './src'
//     const find = new Find()

//     // THIS IS NOT WORKING
//     const mockFileProcessor: FileProcessor = {
//         process: jest.fn(),
//         /*process: function process(fullPath: string) {
//             logger.info(fullPath)
//         },*/
//     }

//     // ACT
//     find.find(basePath, '.*', true, mockFileProcessor)

//     // ASSERT
//     expect(mockFileProcessor.process).toHaveBeenCalled()
//     //expect(mockFileProcessor.process).toHaveBeenCalledTimes(6)
// })
