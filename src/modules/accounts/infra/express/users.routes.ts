import { Router } from 'express'

import { ensureAuthenticate } from '@infra/express/middlewares/ensureAuthenticate'
import { permissions } from '@infra/express/middlewares/permissions'
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { GetUserController } from '@modules/accounts/useCases/getUser/GetUserController'
import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController'

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()
const getUserController = new GetUserController()

const usersRoutes = Router()

usersRoutes
  .use(ensureAuthenticate)
  .use(permissions(['USER', 'ADMIN']))
  .post('/', createUserController.handle)
  .get('/:id', getUserController.handle)
  .get('/', listUsersController.handle)

export { usersRoutes }
