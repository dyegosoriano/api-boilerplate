import { PrismaClient } from '@prisma/client'

import { BcryptHashProvider } from '@shared/container/providers/HashProvider/implementations/BcryptHashProvider'
import { User } from '@modules/accounts/entities/Users'

const prisma = new PrismaClient()

async function main() {
  try {
    const bcryptHashProvider = new BcryptHashProvider()
    const userAdmin = new User()

    const password = await bcryptHashProvider.generateHash('Test123456')

    Object.assign(userAdmin, { password, email: 'admin@email.com', name: 'Admin' })

    const admin = await prisma.users.upsert({
      where: { email: userAdmin.email },
      create: userAdmin,
      update: {}
    })

    console.log({ admin })

    await prisma.$disconnect()
  } catch (error) {
    console.error(error)

    await prisma.$disconnect()
    process.exit(1)
  }
}

main()
