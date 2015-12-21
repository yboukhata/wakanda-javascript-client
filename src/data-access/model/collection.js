import {Entity} from './entity';

class Collection {
  constructor({rawObj, dataClass, wakJSC}) {
    this._processObject({rawObj, dataClass, wakJSC});
  }

  _processObject({rawObj, dataClass, wakJSC}) {
    this._count = rawObj['__COUNT'];
    this._first = rawObj['__FIRST'];
    this._sent = rawObj['__SENT'];
    this.entities = [];

    for (let entity of rawObj['__ENTITIES']) {
      this.entities.push(new Entity({
        rawObj: entity,
        dataClass,
        wakJSC
      }));
    }
  }
}

class DeferredCollection extends Collection {
  constructor({rawObj, dataClass, wakJSC, parentEntity}) {
    super({rawObj, dataClass, wakJSC});
    this.parentEntity = parentEntity;
  }

  //Override
  _processObject() {
  }
}

export {Collection, DeferredCollection};
