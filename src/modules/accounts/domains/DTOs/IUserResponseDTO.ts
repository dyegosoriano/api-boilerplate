interface IUserResponseDTO {
  id: string
  name: string
  email: string

  authentication?: {
    refresh_token: string
    token: string
  }

  updated_at: Date
  created_at: Date
}

export { IUserResponseDTO }
