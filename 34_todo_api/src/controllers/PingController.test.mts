import { PingController } from './PingController'

test('Ping succeeds', async () => {
  // ARRANGE
  const ping = new PingController()

  // ACT

  // ASSERT
  const getMessage = await ping.getMessage()
  expect(getMessage).toMatchObject({ message: 'pong' })
})
