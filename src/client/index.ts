import { UpstashProviderOptions, WebStorageProvider } from '../isomporphic'
import type { PersistenceProvider, PersistenceProviderImpl, PersistenceProviderOptions } from '../provider'
import { UpstashProvider } from '../isomporphic'

/** returns the default persistence provider for each runtime environment */
export const getPersistenceProvider = <T>(
  provider: PersistenceProvider,
  options?: PersistenceProviderOptions,
): PersistenceProviderImpl<T> => {
  switch (provider) {
    case 'upstash':
      return new UpstashProvider<T>(options as UpstashProviderOptions)
    case 'session':
      return new WebStorageProvider<T>(window.sessionStorage)
    case 'local':
      return new WebStorageProvider<T>(window.localStorage)
    case 'memory':
      return new WebStorageProvider<T>()
  }
}
