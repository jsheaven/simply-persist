import type { PersistenceProviderImpl } from '../provider'
import { GenericLocalStorage } from './generic'

export const newInMemoryGenericStorageBackend = <T = string>(): GenericLocalStorage<T> => {
  let cache = new Map<string, T>()
  return {
    clear: (): void => {
      cache.clear()
    },

    getItem: (key: string): T | null => {
      return cache.get(String(key)) ?? null
    },

    removeItem: (key: string): void => {
      cache.delete(String(key))
    },

    setItem: (key: string, value: T): void => {
      cache.set(String(key), value)
    },
  }
}

/** global in-memory storage backend */
export const memory = newInMemoryGenericStorageBackend()

/** a simple, serverless and high-performance key/value storage engine  */
export class WebStorageProvider<T> implements PersistenceProviderImpl<T> {
  protected storage: Partial<GenericLocalStorage<string>>
  constructor(storage?: Storage) {
    this.storage = storage || memory
  }
  async get(key: string, defaultValue: T) {
    const value = this.storage.getItem(key) as string
    if (!value) return defaultValue
    return JSON.parse(value)
  }
  async set(key: string, value: T) {
    this.storage.setItem(key, JSON.stringify(value))
  }
  async del(key: string) {
    this.storage.removeItem(key)
  }
  async clear() {
    this.storage.clear()
  }
}
