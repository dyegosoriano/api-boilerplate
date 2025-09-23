import { v7 as uuid } from 'uuid'

import type { IRole, IUser } from '../domains/models/IUser'

export class User implements IUser {
  id: string

  password: string
  roles: IRole[]
  email: string
  name: string

  updated_at: Date
  created_at: Date

  constructor() {
    if (!this.id) {
      this.created_at = new Date()
      this.updated_at = new Date()
      this.roles = ['USER']
      this.id = uuid()
    }
  }
}
