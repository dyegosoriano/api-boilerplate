export default {
  auth: {
    secret_token: process.env.SECRET_TOKEN || 'secret_token',
    expires_in_refresh_token: '30d',
    expires_refresh_token_days: 30,
    expires_in_token: '15m'
  },
  redis: {
    password: process.env.REDIS_PASSWORD!,
    port: +process.env.REDIS_PORT!,
    host: process.env.REDIS_HOST!,
    url: process.env.REDIS_URL!
  }
}
