import { logger } from './logger'
import * as redis from 'redis'

export class RedisClient {
  private redisClient: redis.RedisClientType | undefined

  constructor() {}

  public async connect(url: string) {
    this.redisClient = redis.createClient({ url })
    this.redisClient.on('error', (err: Error) => logger.error({ message: 'Redis error', err }))
    return this.redisClient.connect()
  }

  public async set(key: string, value: string) {
    logger.debug({ message: 'redis:set', key, value })
    return this.redisClient?.set(key, value)
  }

  public async get(key: string) {
    logger.debug({ message: 'redis:get', key })
    return this.redisClient?.get(key)
  }
}
