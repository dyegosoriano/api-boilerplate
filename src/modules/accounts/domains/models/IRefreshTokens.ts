class IRefreshTokens {
  id: string

  refresh_token: string
  expires_date: Date
  user_id: string

  updated_at: Date
  created_at: Date
}

export { IRefreshTokens }
