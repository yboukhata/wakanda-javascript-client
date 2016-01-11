class Entity {
  constructor({key, deferred}) {
    this._key = key;
    this._deferred = deferred === true;
  }
}

export default Entity;
