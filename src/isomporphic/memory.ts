import type { PersistenceProviderImpl } from '../provider'
import { GenericLocalStorage } from './generic'
import { MiddlewareFn } from '../provider'

export interface MemoryProviderOptions {}

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
  async get(key: string, defaultValue: T, middlewareFn?: MiddlewareFn<T>) {
    const rawValue = this.storage.getItem(key) as string

    if (!rawValue) return defaultValue

    let value = JSON.parse(rawValue)

    if (typeof middlewareFn === 'function') {
      value = await middlewareFn(key, value)
    }
    return value
  }
  async set(key: string, value: T, middlewareFn?: MiddlewareFn<T>) {
    if (typeof middlewareFn === 'function') {
      value = await middlewareFn(key, value)
    }
    this.storage.setItem(key, JSON.stringify(value))
  }
  async del(key: string) {
    this.storage.removeItem(key)
  }
  async clear() {
    this.storage.clear()
  }

  get backendApi() {
    return this.storage
  }
}

export interface MemoryStorage<T> extends PersistenceProviderImpl<T> {
  backendApi: Omit<Omit<Storage, 'key'>, 'length'>
}

export interface WebStorage<T> extends PersistenceProviderImpl<T> {
  backendApi: Storage
}
