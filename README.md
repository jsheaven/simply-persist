<h1 align="center">simply-persist</h1>

> Nano untility library for JavaScript to persist objects (POJOs) everywhere and with ease

<h2 align="center">Purpose</h2>

Accessing `localStorage` and `sessionStorage` or writing to an in-memory object seems easy,
but then there is browser private mode, there are security and quota restrictions, and if
you try to run the same code on client (in the browser) and server, fun with Errors is guaranteed.

This is, why we've built this library that only has one job: Write an object into a storage backend,
be able to read from it by key to get a value and also be able to delete data by key and make this
possible isomorphic on client and server side, no matter what.

<h2 align="center">Features</h2>

- ✅ Write to storage using simple key/value API: `const s = getStorage(); s.set('a', 123); s.get('a', 0) // 123 or 0 if not set`
- ✅ Just `512 byte` nano sized (ESM, gizpped)
- ✅ Isomorphic
- ✅ Supports `localStorage`
- ✅ Supports `sessionStorage`
- ✅ Supports in-memory as an automatic fallback
- ✅ Supports [Upstash](upstash.com) (serverless, free-tier database backend)
- ✅ Tree-shakable, side-effect free, so maybe just `~200 byte` for you
- ✅ First class TypeScript support
- ✅ 100% Unit Test coverage

<h2 align="center">Install</h2>

- yarn: `yarn add simply-persist`
- npm: `npm install simply-persist`

<h2 align="center">Use</h2>

<h3 align="center">ESM</h2>

```ts
import { getStorage } from 'simply-persist'

const storage = getStorage('memory') // also: 'local' | 'session' | 'upstash'

// store a value
await storage.set('abc', 123)

// read a previously stored value, if not existing, return the default (0)
const valueStored = await storage.get('abc', 0)

// delete a single value
await storage.del('abc')

// delete all values
await storage.clear()
```

<h3 align="center">CommonJS</h2>

```ts
const { getStorage } = require('simply-persist')

// same API like ESM variant
```

<h2 align="center">One thing about Node.js and `localStorage` and `sessionStorage`</h2>

The web storage APIs such as `localStorage` and `sessionStorage` are not available in Node.js.
This library will gently fallback to the in-memory variant instead. Please mind the slightly
different application behaviour in this case.
