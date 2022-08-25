import { Router } from 'express'

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { GetUserController } from '@modules/accounts/useCases/getUser/GetUserController'

const createUserController = new CreateUserController()
const getUserController = new GetUserController()

const usersRoutes = Router()

usersRoutes.post('/', createUserController.handle).get('/:id', getUserController.handle)

export { usersRoutes }
