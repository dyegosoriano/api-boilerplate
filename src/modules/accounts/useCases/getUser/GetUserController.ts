import type { Request, Response } from 'express'
import { container } from 'tsyringe'

import { GetUserUseCase } from './GetUserUseCase'

export class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getUserUseCase = container.resolve(GetUserUseCase)
    const user = await getUserUseCase.execute(request.params as any)

    return response.status(200).json(user)
  }
}
