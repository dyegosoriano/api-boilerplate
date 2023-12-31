import { Router } from 'express'

import { ensureAuthenticate } from '@infra/express/middlewares/ensureAuthenticate'
import { permissions } from '@infra/express/middlewares/permissions'
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { GetUserController } from '@modules/accounts/useCases/getUser/GetUserController'
import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController'

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()
const getUserController = new GetUserController()

const path_route = '/users'
const routes = Router()

routes
  .use(ensureAuthenticate, permissions(['USER', 'ADMIN']))
  .post(path_route, createUserController.handle)
  .get(path_route + '/:id', getUserController.handle)
  .get(path_route, listUsersController.handle)

export { routes }
