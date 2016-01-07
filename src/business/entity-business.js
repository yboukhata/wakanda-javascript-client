import AbstractBusiness from './abstract-business';
import EntityService from '../data-access/service/entity-service';
import {AttributeRelated, AttributeCollection} from '../presentation/dataclass';
import {Entity} from '../presentation/entity';

class EntityBusiness extends AbstractBusiness {
  constructor({wakJSC, entity, dataClass, dataClassBusiness}) {
    super({wakJSC});

    this.entity = entity;
    this.dataClass = dataClass;
    this.dataClassBusiness = dataClassBusiness;
    this.service = new EntityService({
      wakJSC,
      entity,
      dataClass
    });
  }

  _decorateEntity() {
    this.entity.save = this.save.bind(this);

    this._addUserDefinedMethods();
  }

  _addUserDefinedMethods() {
    let _this = this;
    for (let method of this.dataClassBusiness.methods.entity) {
      //Voluntary don't use fat arrow notation to use arguments object without a bug
      this.entity[method] = (function() {
        let params = Array.from(arguments);
        return _this.callMethod(method, params);
      }).bind(this);
    }
  }

  callMethod(methodName, parameters) {
    return this.service.callMethod(methodName, parameters);
  }

  save() {
    let data = {};

    if (this.entity['_key'] && this.entity['_stamp']) {
      data['__KEY']   = this.entity['_key'];
      data['__STAMP'] = this.entity['_stamp'];
    }

    for (let attr of this.dataClass.attributes) {
      let objAttr = this.entity[attr.name] || null;

      if (attr instanceof AttributeRelated) {
        data[attr.name] = objAttr ? objAttr._key : null;
      }
      else if (!(attr instanceof AttributeCollection) && !attr.readOnly) {
        data[attr.name] = objAttr;
      }
    }

    //If first-level related entities were already expanded, we will save the
    //entity and ask the server to expand theses attributes on its response
    //So, the user keeps its entities expanded
    let expand = this._getExpandString();

    return this.service.save(data, expand).then(entityDbo => {
      let fresherEntity = this.dataClassBusiness._presentationEntityFromDbo({
        dbo: entityDbo
      });

      this._refreshEntity({fresherEntity});
      return this.entity;
    });
  }

  _refreshEntity({fresherEntity}) {
    for (let prop in fresherEntity) {
      this.entity[prop] = fresherEntity[prop];
    }
  }

  _getExpandString(entity) {
    var expand = '';
    for (let attr of this.dataClass.attributes) {
      if (attr instanceof AttributeRelated || attr instanceof AttributeCollection) {
        if (this.entity[attr.name] instanceof Entity) {
          expand += attr.name + ',';
        }
      }
    }

    return expand.length > 0 ? expand.slice(0, -1) : null;
  }
}

export default EntityBusiness;
