export interface IFindByRefreshTokensDTO {
  refresh_token: string
  user_id?: string
}

export interface ICreateRefreshTokensDTO {
  expires_date: Date
  user_id: string
}
