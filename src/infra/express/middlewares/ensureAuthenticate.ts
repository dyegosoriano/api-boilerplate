import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import config from '@core/config'
import { IRole } from '@modules/accounts/domains/models/IUser'
import { AppError } from '@shared/errors/AppError'

interface IPayload {
  roles: IRole[]
  sub: string
}

export async function ensureAuthenticate (request: Request, _response: Response, next: NextFunction): Promise<void> {
  const authHeader = request.headers.authorization

  if (!authHeader) throw new AppError('Token missing', 401)

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id, roles } = <IPayload>verify(token, config.auth.secret_token)

    request.user = { id: user_id, roles }

    next()
  } catch (error) {
    throw new AppError('Invalid Token', 401)
  }
}
