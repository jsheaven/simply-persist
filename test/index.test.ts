import { getStorage, UpstashProviderOptions, MiddlewareFn } from '../dist/index.esm'
import { config } from 'dotenv'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

config({ path: '.env' })

it('can save in-memory as the default (server)', async () => {
  const memoryStorage = getStorage<number>()
  await memoryStorage.set('abc', 123)
  expect(await memoryStorage.get('abc', 0)).toStrictEqual(123)
})

it('can save in-memory (server)', async () => {
  const memoryStorage = getStorage<number>('memory')
  await memoryStorage.set('abc', 123)
  expect(await memoryStorage.get('abc', 0)).toStrictEqual(123)
})

it('can delete from memory (server)', async () => {
  const memoryStorage = getStorage<number>('memory')
  await memoryStorage.set('abc', 123)
  await memoryStorage.del('abc')
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can clear memory (server)', async () => {
  const memoryStorage = getStorage<number>('memory')
  await memoryStorage.set('abc', 123)
  await memoryStorage.clear()
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can write and read from localStorage (server)', async () => {
  const memoryStorage = getStorage<number>('local')
  await memoryStorage.set('abc', 123)
  expect(await memoryStorage.get('abc', 0)).toStrictEqual(123)
})

it('can delete from localStorage (server)', async () => {
  const memoryStorage = getStorage<number>('local')
  await memoryStorage.set('abc', 123)
  await memoryStorage.del('abc')
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can clear localStorage (server)', async () => {
  const memoryStorage = getStorage<number>('local')
  await memoryStorage.set('abc', 123)
  await memoryStorage.clear()
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can write and read from sessionStorage (server)', async () => {
  const memoryStorage = getStorage<number>('session')
  await memoryStorage.set('abc', 123)
  expect(await memoryStorage.get('abc', 0)).toStrictEqual(123)
})

it('can write and read from sessionStorage using a middleware (server)', async () => {
  const getMiddleware: MiddlewareFn<number> = async <T>(key: string, value: T) => {
    return value
  }

  const setMiddleware: MiddlewareFn<number> = async <T>(key: string, value: T) => {
    return value
  }

  const memoryStorage = getStorage<number>('session')
  await memoryStorage.set('abc', 123, setMiddleware)
  expect(await memoryStorage.get('abc', 0, getMiddleware)).toStrictEqual(123)
})

it('can delete from sessionStorage (server)', async () => {
  const memoryStorage = getStorage<number>('session')
  await memoryStorage.set('abc', 123)
  await memoryStorage.del('abc')
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can clear sessionStorage (server)', async () => {
  const memoryStorage = getStorage<number>('session')
  await memoryStorage.set('abc', 123)
  await memoryStorage.clear()
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can write and read from upstash using a middleware (server)', async () => {
  const getMiddleware: MiddlewareFn<number> = async <T>(key: string, value: T) => {
    return value
  }

  const setMiddleware: MiddlewareFn<number> = async <T>(key: string, value: T) => {
    return value
  }

  const memoryStorage = getStorage<number>('upstash', {
    url: process.env.UPSTASH_REDIS_TEST_URL,
    token: process.env.UPSTASH_REDIS_TEST_TOKEN,
  } as UpstashProviderOptions)
  await memoryStorage.set('abc', 123, setMiddleware)
  expect(await memoryStorage.get('abc', 0, getMiddleware)).toStrictEqual(123)
})

it('can save upstash (server)', async () => {
  const memoryStorage = getStorage<number>('upstash', {
    url: process.env.UPSTASH_REDIS_TEST_URL,
    token: process.env.UPSTASH_REDIS_TEST_TOKEN,
  } as UpstashProviderOptions)
  await memoryStorage.set('abc', 123)
  expect(await memoryStorage.get('abc', 0)).toStrictEqual(123)
})

it('can delete from upstash (server)', async () => {
  const memoryStorage = getStorage<number>('upstash', {
    url: process.env.UPSTASH_REDIS_TEST_URL,
    token: process.env.UPSTASH_REDIS_TEST_TOKEN,
  } as UpstashProviderOptions)
  await memoryStorage.set('abc', 123)
  await memoryStorage.del('abc')
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can clear upstash (server)', async () => {
  const memoryStorage = getStorage<number>(undefined, {
    url: process.env.UPSTASH_REDIS_TEST_URL,
    token: process.env.UPSTASH_REDIS_TEST_TOKEN,
  } as UpstashProviderOptions)
  await memoryStorage.set('abc', 123)
  await memoryStorage.clear()
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can save in-memory as the default (browser)', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>()
  await memoryStorage.set('abc', 123)
  expect(await memoryStorage.get('abc', 0)).toStrictEqual(123)
})

it('can save in-memory (browser)', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('memory')
  await memoryStorage.set('abc', 123)
  expect(await memoryStorage.get('abc', 0)).toStrictEqual(123)
})

it('can delete from memory (browser)', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('memory')
  await memoryStorage.set('abc', 123)
  await memoryStorage.del('abc')
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can clear memory (browser)', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('memory')
  await memoryStorage.set('abc', 123)
  await memoryStorage.clear()
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can save upstash (browser)', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('upstash', {
    url: process.env.UPSTASH_REDIS_TEST_URL,
    token: process.env.UPSTASH_REDIS_TEST_TOKEN,
  } as UpstashProviderOptions)
  await memoryStorage.set('abc', 123)
  expect(await memoryStorage.get('abc', 0)).toStrictEqual(123)
})

it('can delete from upstash (browser)', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('upstash', {
    url: process.env.UPSTASH_REDIS_TEST_URL,
    token: process.env.UPSTASH_REDIS_TEST_TOKEN,
  } as UpstashProviderOptions)
  await memoryStorage.set('abc', 123)
  await memoryStorage.del('abc')
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can clear upstash (browser)', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('upstash', {
    url: process.env.UPSTASH_REDIS_TEST_URL,
    token: process.env.UPSTASH_REDIS_TEST_TOKEN,
  } as UpstashProviderOptions)
  await memoryStorage.set('abc', 123)
  await memoryStorage.clear()
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can write and read from localStorage (browser)', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('local')
  await memoryStorage.set('abc', 123)
  expect(await memoryStorage.get('abc', 0)).toStrictEqual(123)
})

it('can delete from localStorage (browser)', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('local')
  await memoryStorage.set('abc', 123)
  await memoryStorage.del('abc')
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can clear localStorage (browser)', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('local')
  await memoryStorage.set('abc', 123)
  await memoryStorage.clear()
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can write and read from sessionStorage (browser)', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('session')
  await memoryStorage.set('abc', 123)
  expect(await memoryStorage.get('abc', 0)).toStrictEqual(123)
})

it('can delete from sessionStorage (browser)', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('session')
  await memoryStorage.set('abc', 123)
  await memoryStorage.del('abc')
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can clear sessionStorage (browser)', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('session')
  await memoryStorage.set('abc', 123)
  await memoryStorage.clear()
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can write and read from memory (browser)', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('memory')
  await memoryStorage.set('abc', 123)
  expect(await memoryStorage.get('abc', 0)).toStrictEqual(123)
})

it('can delete from memory (browser)', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('memory')
  await memoryStorage.set('abc', 123)
  await memoryStorage.del('abc')
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can clear memory (browser)', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('memory')
  await memoryStorage.set('abc', 123)
  await memoryStorage.clear()
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can write and read from memory using a middleware (browser)', async () => {
  require('global-jsdom/register')

  const getMiddleware: MiddlewareFn<number> = async <T>(key: string, value: T) => {
    return value
  }

  const setMiddleware: MiddlewareFn<number> = async <T>(key: string, value: T) => {
    return value
  }

  const memoryStorage = getStorage<number>('memory')
  await memoryStorage.set('abc', 123, setMiddleware)
  expect(await memoryStorage.get('abc', 0, getMiddleware)).toStrictEqual(123)
})
