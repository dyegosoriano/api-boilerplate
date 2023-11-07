export const config_auth = {
  auth: {
    secret_token: process.env.SECRET_TOKEN || 'secret_token',
    expires_in_refresh_token: '30d',
    expires_refresh_token_days: 30,
    expires_in_token: '8h'
  }
}
