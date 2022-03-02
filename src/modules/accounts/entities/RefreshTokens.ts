import { v4 as uuid } from 'uuid'

import { IRefreshTokens } from '../domains/models/IRefreshTokens'

class RefreshTokens implements IRefreshTokens {
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

export { RefreshTokens }
