<h1 align="center">simply-persist</h1>

> Nano untility library for JavaScript to persist objects (POJOs) everywhere and with ease

<h2 align="center">Purpose</h2>

This is important for SSR/SSG, isomorphic runtime code checks: Should certain code be executed or not?
Some code works only on server, some code works in browser, and some in browser, but not in WebWorkers.

Instead of a weak `if (typeof window !== 'undefined') { ... }` etc. checks which are easy to mistaken
you can use this safe, fast and nano sized library. Using it gives you more readble code and reliability.

<h2 align="center">Features</h2>

- ✅ JavaScript runtime checks: `isBrowser()`, `isServer()`, `isWebWorker()`
- ✅ Just `174 byte` nano sized (ESM, gizpped)
- ✅ Tree-shakable, side-effect free, so maybe just `58 byte` for you
- ✅ Zero dependencies
- ✅ First class TypeScript support
- ✅ 100% Unit Test coverage

<h2 align="center">Install</h2>

- yarn: `yarn add runtime-info`
- npm: `npm install runtime-info`

<h2 align="center">Use</h2>

<h3 align="center">ESM</h2>

```ts
import { isBrowser, isServer, isWebWorker } from 'runtime-info'

if (isBrowser()) {
  // safely use window, location, etc. here
}

if (isServer()) {
  // safely use Node.js/Deno API's here like process
}

if (isWebWorker()) {
  // safely use postMessage() inside of a webworker
}
```

<h3 align="center">CommonJS</h2>

```ts
const { isBrowser, isServer, isWebWorker } = require('runtime-info')

// same API like ESM variant
```

<h2 align="center">One thing about JSDOM</h2>

If you're running inside of a server-side environment where globals like `window` and `document`
are defined (JSDOM), then you're effectively running in a browser-compatible environment, and
this library will return `true` for `isBrowser` and `false` for `isServer`. This is an edge case.
You can check for this using the following code: `navigator.userAgent.includes("jsdom")`
