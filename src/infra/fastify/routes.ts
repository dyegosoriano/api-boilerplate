import { FastifyInstance } from 'fastify'

const routes = (fastify: FastifyInstance, opts: unknown, next) => {
  fastify.get('/', async () => ({ message: 'Hello World!' }))

  next()
}

export { routes }
