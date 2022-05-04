import fastify from 'fastify'

import { routes } from './routes'

const app = fastify({ logger: false })

app.register(routes)

const startServer = (portNumber: number) => {
  app.listen(portNumber, '0.0.0.0', (error: Error | null, url: string) => {
    if (!error) {
      console.log(`🚀 Server is running on ${url}`)
    } else {
      console.error('Error when trying to initialize the server!')
      app.log.error(error)
      process.exit(1)
    }
  })
}

export { startServer, app }
