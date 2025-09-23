import type { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { body } = request

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)
    const user = await authenticateUserUseCase.execute(body)

    return response.status(200).json(user)
  }
}
