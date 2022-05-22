import fastify, { FastifyInstance } from 'fastify'

import { routes } from './routes'

export class AppServer {
  private readonly server: FastifyInstance

  constructor () {
    this.server = fastify({ logger: true })

    this.middlewares()
    this.routes()
  }

  start (port: number, callback?: Function) {
    this.server.listen(port, '0.0.0.0', (error: Error | null, url: string) => {
      if (!error) {
        console.info(`🚀 Server is running on ${url}`)
        console.info(`Worker started pid: ${process.pid}`)

        if (callback) callback(process.pid)
      } else {
        console.error('Error when trying to initialize the server!')
        console.error(error)

        process.exit(1)
      }
    })
  }

  private middlewares () {}

  private routes () {
    this.server.register(routes)
  }
}
