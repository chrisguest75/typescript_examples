import { logger } from '../src/logger.js'
import path from 'path'
import { DockerComposeEnvironment, Wait } from 'testcontainers'
import fetch from 'node-fetch'

export default async function compose() {
  logger.info('Compose - PodInfo')
  const cwd = process.cwd()
  const environment = await new DockerComposeEnvironment(path.join(cwd, 'data/compose'), 'docker-compose.podinfo.yaml')
  environment.withWaitStrategy('podinfo', Wait.forListeningPorts())
  const live = await environment.up(['podinfo'])
  logger.info('Started ')

  const response = await fetch('http://localhost:9898/')
  const body = await response.text()

  console.log(body)

  live.stop()
}
