import { Redis as IoRedis } from 'ioredis'

import config from '@core/config'

const minutes = 60 * 1

class RedisClient {
  private client

  constructor () {
    this.client = new IoRedis(config.redis.url)
  }

  public async save<T> (key: string, value: T, ttl = minutes): Promise<void> {
    this.client.set(key, JSON.stringify(value), 'EX', ttl)
  }

  public async recover<T> (key: string): Promise<T | null> {
    const data = await this.client.get(key)
    if (!data) return null

    const parseData = JSON.parse(data) as T
    return parseData
  }

  public async invalidate (key: string): Promise<void> {
    await this.client.del(key)
  }

  public async invalidatePrefix (prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`)
    const pipeline = this.client.pipeline()

    for (const key of keys) {
      pipeline.del(key)
    }

    await pipeline.exec()
  }
}

export const Redis = new RedisClient()
