import { container } from 'tsyringe'

import '@shared/container/providers'

import { IUsersRepository } from '@modules/accounts/domains/repositories/IUsersRepository'
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
