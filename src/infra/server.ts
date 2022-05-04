import 'dotenv/config'

import { startServer } from './fastify/app'

const port = Number(process.env.PORT) || 3333

startServer(port)
