import { logger } from './logger'
import { Manager, Socket } from 'socket.io-client'
import { z } from 'zod'

const PayloadZod = z.object({
  counter: z.number().min(1).max(10000),
  message: z.string().min(1).max(256),
})

export type Payload = z.infer<typeof PayloadZod>

export type EventPayload = {
  counter: number
  message: string
}


export class WebsocketClient {
  private manager: Manager
  private socket: Socket
  private ws_url: string

  constructor(ws_url: string) {
    this.ws_url = ws_url
    this.manager = new Manager(this.ws_url)
    this.socket = this.manager.socket('/')
  }

  public connect() {
    this.socket.on('connect', () => {
      logger.info(`connected ${this.socket.id}`)
    })
    this.socket.on('payload_ack', (payload: Payload) => {
      const payloadVerified = PayloadZod.parse(payload)
      logger.info({ socketId: this.socket.id, ...payloadVerified })
    })
    this.socket.on('disconnect', () => {
      logger.info(`disconnect`)
    })
  }

  public sendPayload(payload: EventPayload) {
    this.socket.emit('payload', payload, (ack: Payload) => {
      logger.info({ ack })
    })
  }

  public sendPing() {
    this.socket.emit('ping', () => {
      logger.info('ping sent')
    })
  }
}
