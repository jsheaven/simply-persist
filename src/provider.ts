import type { UpstashProviderOptions } from './isomporphic/upstash'

export type MiddlewareFn<T> = (key: string, value: T) => Promise<T>

/** a simple key/value persistence interface */
export interface PersistenceProviderImpl<T> {
  get: (key: string, defaultValue: T, middlewareFn?: MiddlewareFn<T>) => Promise<T>
  set: (key: string, value: T, middlewareFn?: MiddlewareFn<T>) => Promise<void>
  del: (key: string) => Promise<void>
  clear: () => Promise<void>
}

export type PersistenceProvider = 'upstash' | 'session' | 'local' | 'memory'

export type PersistenceProviderOptions = UpstashProviderOptions
