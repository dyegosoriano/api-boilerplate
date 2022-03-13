import { Router } from 'express'

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController'
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController'

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

const authenticateRoutes = Router()

authenticateRoutes
  .post('/refresh-token', refreshTokenController.handle)
  .post('/sessions', authenticateUserController.handle)

export { authenticateRoutes }
