# Wakanda Javascript Client

## v0.2.0 - Beta

- [Feature] Support of server methods for collections
- [Feature] Throw error if non-allowed properties are passed as option for `find`, `query` and `fetch` methods
- [Feature] Add `recompute` method, to execute server-side logic (calculated attribute computation, init and clientrefresh events) to the local entity
- [Bugfix] Throw an error if a partial catalog is retrieved with not all needed dataClasses (related attributes, etc.)
- [Bugfix] `fetch` called on a already fetched collection will keep previously defined `pageSize` if another one is not given
- [Test] Integration tests for collection methods
- [Test] Integration tests for automatic transformation of sever methods into collection or entities when needed
- [Test] Integration tests for `isEntity` and `isCollection` helpers
- [Misc] Add `Contacts` Wakanda Solution on repository (used for integration tests)

#### Known issues

- Collections returned by server methods can not properly call methods like `nextPage`, `prevPage` or server methods
- Expanded collections (the ones retrieved with `select` option) do not properly retrieve result of server methods if it's a collection or an entity


## v0.1.0 - Beta

Initial release
