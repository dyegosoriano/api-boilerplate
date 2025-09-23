import { Redis as IoRedis } from 'ioredis'

import { config_redis } from '@core/config/redis'
import type { IRedisClient } from '@core/types/infra/IRedisClient'

const seconds = 60 * 1 // one minute

class RedisClient implements IRedisClient {
  private client

  constructor() {
    this.client = new IoRedis(config_redis.redis.url)
  }

  public async save<T = unknown>(key: string, value: T, ttl = seconds): Promise<void> {
    await this.client.set(key, JSON.stringify(value), 'EX', ttl)
  }

  public async recover<T = unknown>(key: string): Promise<T | null> {
    const data = await this.client.get(key)
    if (data) return JSON.parse(data) as T

    return null
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key)
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`)
    const pipeline = this.client.pipeline()

    for (const key of keys) {
      pipeline.del(key)
    }

    await pipeline.exec()
  }
}

export const Redis = new RedisClient()
