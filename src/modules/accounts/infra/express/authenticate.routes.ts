import { Router } from 'express'

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController'
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController'

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

const path_route = '/authenticate'
const routes = Router()

routes
  .post(path_route + '/refresh-token', refreshTokenController.handle)
  .post(path_route + '/sessions', authenticateUserController.handle)

export { routes }
