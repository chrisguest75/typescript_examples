import path from 'path'
import { RedisContainer, StartedRedisContainer } from '@testcontainers/redis'
import { Wait } from 'testcontainers'
import { createClient } from 'redis'

async function connectTo(container: StartedRedisContainer) {
  const client = createClient({
    url: container.getConnectionUrl(),
  })
  await client.connect()
  expect(client.isOpen).toBeTruthy()
  return client
}

test('empty test', async () => {
  // ARRANGE
  const container = new RedisContainer()
  container.withPassword('test')
  const cwd = process.cwd()
  container.withPersistence(path.join(cwd, 'data/redis'))
  container.withWaitStrategy(Wait.forListeningPorts())
  const startedContainer: StartedRedisContainer = await container.start()

  const client = await connectTo(startedContainer)
  // ACT
  await client.set('key', 'val')

  // ASSERT
  expect(await client.get('key')).toBe('val')

  await client.disconnect()
  await startedContainer.stop()
})

describe('redis', () => {
  let startedContainer: StartedRedisContainer

  beforeAll(async () => {
    // ARRANGE
    const container = new RedisContainer()
    container.withPassword('test')
    const cwd = process.cwd()
    container.withPersistence(path.join(cwd, 'data/redis'))
    container.withWaitStrategy(Wait.forListeningPorts())
    startedContainer = await container.start()
  })

  afterAll(async () => {
    await startedContainer.stop()
  })

  test('store value', async () => {
    const client = await connectTo(startedContainer)
    // ACT
    await client.set('key', 'val')

    // ASSERT
    expect(await client.get('key')).toBe('val')

    await client.disconnect()
  })
})
