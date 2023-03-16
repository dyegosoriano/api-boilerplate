import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { body } = request

    const createUserUseCase = container.resolve(CreateUserUseCase)
    const user = await createUserUseCase.execute(body)

    return response.status(200).json(user)
  }
}
