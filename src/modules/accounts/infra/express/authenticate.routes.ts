import { Router } from 'express'

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController'
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController'

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

const routes = Router()

routes
  .use('/authenticate', routes)
  .post('/refresh-token', refreshTokenController.handle)
  .post('/sessions', authenticateUserController.handle)

export { routes }
