import Attribute from './attribute';
import AttributeCollection from './attribute-collection';
import AttributeRelated from './attribute-related';
import DeferredEntity from './deferred-entity';

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
            wakJSC: wakJSC
          });
        }
      }
      else {
        this[attr.name] = rawObj[attr.name];
      }
    }
  }
}

export default Entity;
