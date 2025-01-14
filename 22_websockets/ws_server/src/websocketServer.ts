import { logger } from './logger'
import * as socketio from 'socket.io'
import * as http from 'http'
import { z } from 'zod'
import { RedisClient } from './redis'

const EventPayloadZod = z.object({
  counter: z.number().min(1).max(10000),
  message: z.string().min(1).max(256),
})

export type EventPayload = z.infer<typeof EventPayloadZod>

export class WebsocketServer {
  private io: socketio.Server
  private redisClient: RedisClient

  constructor(httpserver: http.Server) {
    this.io = new socketio.Server(httpserver, {
      cors: { origin: '*', methods: ['GET', 'POST'] },
    })
    this.redisClient = new RedisClient()
  }

  async start() {
    await this.redisClient.connect(process.env.REDIS_URL || 'redis://0.0.0.0:6379')
    const current = await this.redisClient.get('current')
    const value = await this.redisClient.get(current || 'not found')
    logger.info({ current, value })

    let counter = 0
    this.io.on('connection', (socket: socketio.Socket) => {
      logger.info(`User connected: ${socket.id}`)

      socket.on('payload', async (payload: EventPayload) => {
        const eventPayloadVerified = EventPayloadZod.parse(payload)
        logger.info({ ...eventPayloadVerified })
        await this.redisClient.set(eventPayloadVerified.counter.toString(), eventPayloadVerified.message)
        await this.redisClient.set('current', eventPayloadVerified.counter.toString())

        counter++
        socket.emit('payload_ack', { message: 'payload received', counter: counter })
      })

      socket.on('disconnect', () => logger.info(`User disconnected`))
    })
  }
}
