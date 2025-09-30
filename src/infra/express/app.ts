import 'reflect-metadata'
import 'dotenv/config'

import express, { type Application } from 'express'
import helmet from 'helmet'

import '@shared/container'

import { ensureSSL } from './middlewares/ensureSSL'
import errorHandling from './middlewares/errorHandling'
import { expressSetupRoutes } from './utils/expressSetupRoutes'

export class AppServer {
  private readonly server: Application

  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
    this.errorsHandler()
  }

  start(port: number, callback?: Function) {
    return this.server.listen(port, () => {
      console.info(`🚀 Server is running port: ${port}`)
      console.info(`Worker started pid: ${process.pid}`)

      if (callback) callback(process.pid)
    })
  }

  private errorsHandler() {
    this.server.use(errorHandling.notFound)
    this.server.use(errorHandling.globalErrors)
  }

  private middlewares() {
    if (process.env.NODE_ENV === 'production') this.server.use(ensureSSL)

    this.server.disable('x-powered-by')
    this.server.use(helmet())

    this.server.use(express.json())
  }

  private routes() {
    expressSetupRoutes(this.server)
  }
}
