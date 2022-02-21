Cross Domain Safe WeakMap
-------------------------

[![build status][build-badge]][build]
[![code coverage][coverage-badge]][coverage]
[![npm version][version-badge]][package]
[![apache license][license-badge]][license]

[build-badge]: https://img.shields.io/github/workflow/status/krakenjs/cross-domain-safe-weakmap/build?logo=github&style=flat-square
[build]: https://github.com/krakenjs/cross-domain-safe-weakmap/actions/workflows/main.yml?query=workflow:build
[coverage-badge]: https://img.shields.io/codecov/c/github/krakenjs/cross-domain-safe-weakmap.svg?style=flat-square
[coverage]: https://codecov.io/github/krakenjs/cross-domain-safe-weakmap
[version-badge]: https://img.shields.io/npm/v/@krakenjs/cross-domain-safe-weakmap.svg?style=flat-square
[package]: https://www.npmjs.com/package/@krakenjs/cross-domain-safe-weakmap
[license-badge]: https://img.shields.io/npm/l/@krakenjs/cross-domain-safe-weakmap.svg?style=flat-square
[license]: https://github.com/krakenjs/cross-domain-safe-weakmap/blob/main/LICENSE

WeakMap shim that works with cross-domain windows. Uses native WeakMap when available.

## Installation

As of version 2 this package will be published under the `@krakenjs` scope.

```
npm install @krakenjs/cross-domain-safe-weakmap
```

### Rationale

Storing references to window objects is memory-expensive, even after those window objects have closed.

Existing WeakMap shims hang an object of the WeakMap key. This poses a problem when dealing with cross-domain windows, where setting or getting any key other than a pre-defined set of readonly values, will throw a cross-origin error.
