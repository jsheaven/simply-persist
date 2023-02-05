import { getStorage } from '../dist/index'

it('can save in-memory', async () => {
  const memoryStorage = getStorage<number>('memory')
  await memoryStorage.set('abc', 123)
  expect(await memoryStorage.get('abc', 0)).toStrictEqual(123)
})

it('can delete from memory', async () => {
  const memoryStorage = getStorage<number>('memory')
  await memoryStorage.set('abc', 123)
  await memoryStorage.del('abc')
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can clear memory', async () => {
  const memoryStorage = getStorage<number>('memory')
  await memoryStorage.set('abc', 123)
  await memoryStorage.clear()
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can write and read from localStorage', async () => {
  const memoryStorage = getStorage<number>('local')
  await memoryStorage.set('abc', 123)
  expect(await memoryStorage.get('abc', 0)).toStrictEqual(123)
})

it('can delete from localStorage', async () => {
  const memoryStorage = getStorage<number>('local')
  await memoryStorage.set('abc', 123)
  await memoryStorage.del('abc')
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can clear localStorage', async () => {
  const memoryStorage = getStorage<number>('local')
  await memoryStorage.set('abc', 123)
  await memoryStorage.clear()
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can write and read from sessionStorage', async () => {
  const memoryStorage = getStorage<number>('session')
  await memoryStorage.set('abc', 123)
  expect(await memoryStorage.get('abc', 0)).toStrictEqual(123)
})

it('can delete from sessionStorage', async () => {
  const memoryStorage = getStorage<number>('session')
  await memoryStorage.set('abc', 123)
  await memoryStorage.del('abc')
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can clear sessionStorage', async () => {
  const memoryStorage = getStorage<number>('session')
  await memoryStorage.set('abc', 123)
  await memoryStorage.clear()
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can save in-memory', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('memory')
  await memoryStorage.set('abc', 123)
  expect(await memoryStorage.get('abc', 0)).toStrictEqual(123)
})

it('can delete from memory', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('memory')
  await memoryStorage.set('abc', 123)
  await memoryStorage.del('abc')
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can clear memory', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('memory')
  await memoryStorage.set('abc', 123)
  await memoryStorage.clear()
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can write and read from localStorage', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('local')
  await memoryStorage.set('abc', 123)
  expect(await memoryStorage.get('abc', 0)).toStrictEqual(123)
})

it('can delete from localStorage', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('local')
  await memoryStorage.set('abc', 123)
  await memoryStorage.del('abc')
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can clear localStorage', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('local')
  await memoryStorage.set('abc', 123)
  await memoryStorage.clear()
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can write and read from sessionStorage', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('session')
  await memoryStorage.set('abc', 123)
  expect(await memoryStorage.get('abc', 0)).toStrictEqual(123)
})

it('can delete from sessionStorage', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('session')
  await memoryStorage.set('abc', 123)
  await memoryStorage.del('abc')
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})

it('can clear sessionStorage', async () => {
  require('global-jsdom/register')
  const memoryStorage = getStorage<number>('session')
  await memoryStorage.set('abc', 123)
  await memoryStorage.clear()
  expect(await memoryStorage.get('abc', 444)).toStrictEqual(444)
})
