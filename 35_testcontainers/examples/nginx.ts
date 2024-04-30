import { logger } from '../src/logger.js'
import path from 'path'
import { TestContainer, StartedTestContainer, GenericContainer, Wait } from 'testcontainers'

export default async function nginx() {
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
  container.withWaitStrategy(
    Wait.forHttp('/', 8080).forStatusCodeMatching((statusCode) => {
      logger.info({ statusCode })
      return statusCode === 200
    }),
  )
  const startedContainer: StartedTestContainer = await container.start()

  logger.info({
    id: startedContainer.getId(),
    name: startedContainer.getName(),
    host: startedContainer.getHost(),
  })

  const logs = await startedContainer.logs()
  logs
    .on('data', (line) => logger.info(line))
    .on('err', (line) => logger.error(line))
    .on('end', () => logger.info('Stream closed'))

  /*if (args['throwError']) {
      throw new Error("I'm an error")
  }*/

  //const stoppedContainer: StoppedTestContainer = await startedContainer.stop()
}
