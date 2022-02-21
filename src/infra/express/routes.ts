import { Router } from 'express'

import { usersRoutes } from '@modules/accounts/infra/express/users.routes'

const routes = Router()

routes.use('/users', usersRoutes)

export { routes }
