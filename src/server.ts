import 'dotenv/config'

import { startServer } from './infra/express/app'

const port = process.env.PORT || 3333

startServer(port)
