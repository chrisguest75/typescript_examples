import path from 'path'
import { logger } from '../src/logger.js'
import { RedisContainer, StartedRedisContainer } from '@testcontainers/redis'
import { createClient } from 'redis'

async function connectTo(container: StartedRedisContainer) {
  const client = createClient({
    url: container.getConnectionUrl(),
  })
  await client.connect()
  logger.info({ open: client.isOpen })
  return client
}

export default async function redis() {
  logger.info('Redis')

  const container = new RedisContainer()
  container.withPassword('test')
  const cwd = process.cwd()
  container.withPersistence(path.join(cwd, 'data/redis'))
  const startedContainer: StartedRedisContainer = await container.start()

  const client = await connectTo(startedContainer)

  await client.set('key', 'val')
  logger.info(await client.get('key'))

  await client.disconnect()
  await startedContainer.stop()
}
