import { Redis } from '@upstash/redis/with-fetch'
import type { PersistenceProviderImpl } from '../provider'

export interface UpstashProviderOptions {
  url: string
  token: string
}

/** a simple, serverless and high-performance key/value storage engine  */
export class UpstashProvider<T> implements PersistenceProviderImpl<T> {
  protected upstashClient: Redis
  constructor(options: UpstashProviderOptions) {
    this.upstashClient = new Redis({
      url: options.url,
      token: options.token,
    })
  }
  async get(key: string, defaultValue: T) {
    return ((await this.upstashClient.get(key)) || defaultValue) as T
  }
  async set(key: string, value: T) {
    await this.upstashClient.set(key, value)
  }
  async del(key: string) {
    await this.upstashClient.del(key)
  }
  async clear() {
    await this.upstashClient.flushdb()
  }
}
