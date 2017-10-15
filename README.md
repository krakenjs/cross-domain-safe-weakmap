Cross Domain Safe WeakMap
-------------------------

WeakMap shim that works with cross-domain windows. Uses native WeakMap when available.

### Rationale

Storing references to window objects is memory-expensive, even after those window objects have closed.

Existing WeakMap shims hang an object of the WeakMap key. This poses a problem when dealing with cross-domain windows, where setting or getting any key other than a pre-defined set of readonly values, will throw a cross-origin error.