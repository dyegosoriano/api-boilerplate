export interface IRedisClient {
  save(key: string, value: any, ttl?: number): Promise<void>
  invalidatePrefix(prefix: string): Promise<void>
  recover<T>(key: string): Promise<T | null>
  invalidate(prefix: string): Promise<void>
}
