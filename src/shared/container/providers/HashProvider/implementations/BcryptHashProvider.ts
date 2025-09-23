import { compare, hash } from 'bcryptjs'

import type { IHashProvider } from '../models/IHashProvider'

export class BcryptHashProvider implements IHashProvider {
  public async generateHash(password: string): Promise<string> {
    return hash(password, 8)
  }

  public async compareHash(password: string, hashed: string): Promise<boolean> {
    return compare(password, hashed)
  }
}
