import type { FastifyInstance } from 'fastify'

const routes = (fastify: FastifyInstance, opts: unknown, next: Function) => {
  fastify.get('/', async () => ({ message: 'Hello World!' }))

  next()
}

export { routes }
