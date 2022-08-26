import { Router } from 'express'

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { GetUserController } from '@modules/accounts/useCases/getUser/GetUserController'
import { ListUsersController } from '@modules/accounts/useCases/listUsersUseCase/ListUsersController'

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()
const getUserController = new GetUserController()

const usersRoutes = Router()

usersRoutes
  .post('/', createUserController.handle)
  .get('/', listUsersController.handle)
  .get('/:id', getUserController.handle)

export { usersRoutes }
