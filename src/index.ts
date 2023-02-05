import type { PersistenceProvider, PersistenceProviderImpl, PersistenceProviderOptions } from './provider'
import { getPersistenceProvider as getPersistenceProviderClient } from './client'
import { getPersistenceProvider as getPersistenceProviderServer } from './server'
import { isServer } from 'runtime-info'

/** returns the persistence provider (isomorphic) */
export const getStorage = <T>(
  provider: PersistenceProvider = 'local',
  options?: PersistenceProviderOptions,
): PersistenceProviderImpl<T> => {
  if (isServer()) {
    return getPersistenceProviderServer(provider, options)
  } else {
    return getPersistenceProviderClient(provider, options)
  }
}

export * from './provider'
