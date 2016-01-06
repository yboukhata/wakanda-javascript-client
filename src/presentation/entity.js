class Entity {
  constructor({key}) {
    this._key = key;
  }
}

class DeferredEntity extends Entity {
}

export {Entity, DeferredEntity};
