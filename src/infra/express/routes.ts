import { Router } from 'express'

import { authenticateRoutes } from '@modules/accounts/infra/express/authenticate.routes'
import { usersRoutes } from '@modules/accounts/infra/express/users.routes'

const routes = Router()

routes
  .get('/', (_req, res) => res.json({ message: 'Hello World!' }))
  .use('/authenticate', authenticateRoutes)
  .use('/users', usersRoutes)

export { routes }
