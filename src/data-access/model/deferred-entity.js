import Entity from './entity';

class DeferredEntity extends Entity {
  constructor({rawObj, dataClass, wakJSC, parentEntity}) {
    super({rawObj, dataClass, wakJSC});
    this._parentEntity = parentEntity;
  }

  _processObject({rawObj}) {
    this.ID = rawObj['__KEY'];
  }
}

export default DeferredEntity;
