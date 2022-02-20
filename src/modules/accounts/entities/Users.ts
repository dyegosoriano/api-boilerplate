import { v4 as uuid } from 'uuid'

import { IUser } from '../domains/models/IUser'

class User implements IUser {
  id: string

  email: string

  name: string

  password: string

  updated_at: Date

  created_at: Date

  constructor () {
    if (!this.id) {
      this.created_at = new Date()
      this.updated_at = new Date()
      this.id = uuid()
    }
  }
}

export { User }
