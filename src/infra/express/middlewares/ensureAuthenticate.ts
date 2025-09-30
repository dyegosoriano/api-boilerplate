import type { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import type { IRole } from '@modules/accounts/domains/models/IUser'

import { AppError } from '@shared/errors/AppError'

import { config_auth } from '@core/config/auth'

interface IPayload {
  roles: IRole[]
  sub: string
}

export async function ensureAuthenticate(request: Request, _response: Response, next: NextFunction): Promise<void> {
  const authHeader = request.headers.authorization

  if (!authHeader) throw new AppError('Token missing', 401)

  const [, token] = authHeader.split(' ')

  try {
    // TODO: implementar validação de usuário com buscas no banco de dados e cache
    const { sub: user_id, roles } = <IPayload>verify(token, config_auth.auth.secret_token)

    request.user = { id: user_id, roles }

    next()
  } catch (_error) {
    throw new AppError('Invalid Token', 401)
  }
}
