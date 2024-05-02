import { logger } from '../src/logger.js'
import path from 'path'
import { TestContainer, StartedTestContainer, StoppedTestContainer, GenericContainer, Wait } from 'testcontainers'
import fetch from 'node-fetch'

export default async function nginx() {
  logger.info('NGinx')

  const imageName = 'nginx:1.25.5'
  const container: TestContainer = new GenericContainer(imageName)
  //container.withReuse()
  container.withExposedPorts({ container: 80, host: 8080 })
  container.withLogConsumer((stream) => {
    stream.on('data', (line) => logger.info(line))
    stream.on('err', (line) => logger.error(line))
    stream.on('end', () => logger.info('Stream closed'))
  })

  const cwd = process.cwd()
  container.withBindMounts([
    {
      source: path.join(cwd, 'data/site'),
      target: '/usr/share/nginx/html',
    },
  ])
  /*container.withWaitStrategy(
    Wait.forHttp('/', 8080).forStatusCodeMatching((statusCode) => {
      logger.info({ statusCode })
      return statusCode === 200
    }),
  )*/
  const startedContainer: StartedTestContainer = await container.start()

  logger.info({
    id: startedContainer.getId(),
    name: startedContainer.getName(),
    host: startedContainer.getHost(),
  })

  const response = await fetch('http://localhost:8080/')
  const body = await response.text()

  console.log(body)

  const stoppedContainer: StoppedTestContainer = await startedContainer.stop()
  logger.info({
    id: stoppedContainer.getId(),
  })
}
