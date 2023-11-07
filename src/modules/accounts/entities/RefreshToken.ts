import { v4 as uuid } from 'uuid'

import { IRefreshToken } from '../domains/models/IRefreshToken'

export class RefreshTokens implements IRefreshToken {
  id: string

  user_id: string
  refresh_token: string
  expires_date: Date

  updated_at: Date
  created_at: Date

  constructor () {
    if (!this.id) {
      this.created_at = new Date()
      this.updated_at = new Date()
      this.refresh_token = uuid()
      this.id = uuid()
    }
  }
}
