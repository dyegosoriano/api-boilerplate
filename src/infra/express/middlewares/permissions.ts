import { NextFunction, Request, Response } from 'express'

import { IRole } from '@modules/accounts/domains/models/IUser'
import { AppError } from '@shared/errors/AppError'

export function permissions (rolesRoutes: IRole[]) {
  return (request: Request, _response: Response, next: NextFunction): void => {
    const { user } = request

    if (!user) throw new AppError('User does not exists', 400)

    const roleExists = user.roles.map(role => role).some(role => rolesRoutes.includes(role))

    if (!roleExists) throw new AppError('User does not have permission', 401)

    return next()
  }
}
