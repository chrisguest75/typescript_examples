import { logger } from '../src/logger.js'
import path from 'path'
import { DockerComposeEnvironment, Wait } from 'testcontainers'

export default async function compose() {
  logger.info('Compose - Longrun')

  const cwd = process.cwd()
  const environment = await new DockerComposeEnvironment(path.join(cwd, 'data/compose'), 'docker-compose.longrun.yaml')
  environment.withStartupTimeout(5000)
  environment.withWaitStrategy('longrun-1', Wait.forLogMessage('--Ready--'))
  //environment.withWaitStrategy('longrun', Wait.forListeningPorts())
  const live = await environment.up(['longrun'])
  logger.info('Started ')

  const startedContainer = live.getContainer('longrun-1')
  const logs = await startedContainer.logs()
  logs.addListener('data', (line) => logger.info(line))

  // sleep
  await new Promise((resolve) => setTimeout(resolve, 5000))

  logger.info({
    id: startedContainer.getId(),
    name: startedContainer.getName(),
    host: startedContainer.getHost(),
  })

  live.stop()
}
