import AttributeCollection from './attribute-collection';
import AttributeRelated from './attribute-related';
import {Collection, DeferredCollection} from './collection';

class Entity {
  constructor({rawObj, dataClass, wakJSC}) {
    this._key = rawObj['__KEY'];
    this._stamp = rawObj['__STAMP'];

    this._processObject({rawObj, dataClass, wakJSC});
  }

  _processObject({rawObj, dataClass, wakJSC}) {
    for (let attr of dataClass.attributes) {
      if (attr instanceof AttributeRelated) {

        let obj = rawObj[attr.name];

        if (obj) {
          if (obj['__deferred']) {
            this[attr.name] = new DeferredEntity({
              rawObj: obj['__deferred'],
              dataClass: wakJSC._dataclassMap.get(attr.type),
              parentEntity: this
            });
          }
          else {
            this[attr.name] = new Entity({
              rawObj: obj,
              dataClass: wakJSC._dataclassMap.get(attr.type),
              wakJSC
            });
          }
        }
        else {
          this[attr.name] = null;
        }
      }
      else if (attr instanceof AttributeCollection) {
        let obj = rawObj[attr.name];

        if (obj) {
          if (obj['__deferred']) {
            this[attr.name] = new DeferredCollection({
              rawObj: obj['__deferred'],
              dataClass: wakJSC._dataclassMap.get(attr.type),
              parentEntity: this
            });
          }
          else {
            this[attr.name] = new Collection({
              rawObj: obj,
              dataClass: wakJSC._dataclassMap.get(attr.entityType),
              wakJSC
            });
          }
        }
        else {
          this[attr.name] = null;
        }
      }
      else {
        this[attr.name] = rawObj[attr.name] || null;
      }
    }
  }
}

//Have to define DeferredEntity on same file to avoid a circular dependency that
//causes a Webpack error at runtime
class DeferredEntity extends Entity {
  constructor({rawObj, dataClass, wakJSC, parentEntity}) {
    super({rawObj, dataClass, wakJSC});
    this._parentEntity = parentEntity;
  }

  _processObject({rawObj}) {
    this.ID = rawObj['__KEY'];
  }
}

export {Entity, DeferredEntity};
