import type { UpstashProviderOptions } from './isomporphic/upstash'

/** a simple key/value persistence interface */
export interface PersistenceProviderImpl<T> {
  get: (key: string, defaultValue: T) => Promise<T>
  set: (key: string, value: T) => Promise<void>
  del: (key: string) => Promise<void>
  clear: () => Promise<void>
}

export type PersistenceProvider = 'upstash' | 'session' | 'local' | 'memory'

export type PersistenceProviderOptions = UpstashProviderOptions
