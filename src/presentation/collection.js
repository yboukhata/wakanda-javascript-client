class Collection {
  constructor({deferred, dataClass}) {
    this.entities = [];
    this._deferred = deferred === true;

    Object.defineProperty(this, '_dataClass', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: dataClass
    });
  }
}
export default Collection;
