import { UpstashProviderOptions, WebStorageProvider } from '../isomporphic'
import { UpstashProvider } from '../isomporphic'
import { PersistenceProvider, PersistenceProviderImpl, PersistenceProviderOptions } from '../provider'

/** returns the default persistence provider for each runtime environment */
export const getPersistenceProvider = <T>(
  provider: PersistenceProvider,
  options?: PersistenceProviderOptions,
): PersistenceProviderImpl<T> => {
  switch (provider) {
    case 'upstash':
      return new UpstashProvider<T>(options as UpstashProviderOptions)
    case 'session':
      return new WebStorageProvider<T>()
    case 'local':
      return new WebStorageProvider<T>()
    case 'memory':
      return new WebStorageProvider<T>()
  }
}
