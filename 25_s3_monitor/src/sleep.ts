import { logger } from './logger'

export default function sleep(ms: number): Promise<string> {
    return new Promise((resolve) => {
        // logger.info(`Sleep for ${ms}`);
        setTimeout(() => {
            resolve('Complete')
        }, ms)
    })
}
