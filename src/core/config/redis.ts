import { URL } from 'node:url'

const url = new URL(process.env.REDIS_URL!)

type IRedis = {
  redis: {
    protocol: string
    password: string
    port: number
    host: string
    url: string
  }
}

export const config_redis = {
  redis: {
    url: `${url.protocol}//${url.password}@${url.hostname}:${url.port}`,
    port: parseInt(url.port),
    password: url.password!,
    protocol: url.protocol,
    host: url.hostname
  }
} as IRedis
