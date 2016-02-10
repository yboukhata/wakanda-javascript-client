class Entity {
  constructor({key, deferred, dataClass}) {
    this._key = key;
    this._deferred = deferred === true;

    Object.defineProperty(this, '_dataClass', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: dataClass
    });
  }
}

export default Entity;
