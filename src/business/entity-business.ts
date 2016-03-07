import AbstractBusiness from './abstract-business';
import EntityService from '../data-access/service/entity-service';
import {AttributeRelated, AttributeCollection} from '../presentation/dataclass';
import Entity from '../presentation/entity';
import {DataClass} from '../presentation/dataclass';
import DataClassBusiness from './dataclass-business';
import {QueryOption} from '../presentation/query-option';

export interface EntityDBO {
  __KEY?: string;
  __STAMP?: number;
  __deferred?: {uri: string, __KEY: string};
  
  [key: string]: any;
}

class EntityBusiness extends AbstractBusiness {
  
  private entity: Entity;
  private dataClass: DataClass;
  private dataClassBusiness: DataClassBusiness;
  private service: EntityService;
  
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
    this.entity.delete = this.delete.bind(this);
    this.entity.fetch = this.fetch.bind(this);

    this._addUserDefinedMethods();
  }

  _addUserDefinedMethods() {
    let _this_ = this;
    this.dataClassBusiness.methods.entity.forEach(method => {
      //Voluntary don't use fat arrow notation to use arguments object without a bug
      this.entity[method] = function() {
        let params = Array.from(arguments);
        return _this_.callMethod(method, params);
      };
    });
  }

  fetch(options: QueryOption): Promise<Entity> {
    return this.dataClassBusiness.find(this.entity._key, options).then(fresherEntity => {
      this._refreshEntity({fresherEntity});
      return this.entity;
    });
  }

  callMethod(methodName: string, parameters: any[]): Promise<any> {
    if (!this.entity._key) {
      throw new Error('Entity.' + methodName + ': can not be called on an unsaved entity');
    }

    return this.service.callMethod(methodName, parameters)
    .then(obj => {

      if (obj && obj.__entityModel) {
        let business = this.dataClassBusiness._dataClassBusinessMap.get(obj.__entityModel);

        if (business) {
          //Returned object is a collection
          if (typeof obj.__COUNT !== 'undefined' &&
              typeof obj.__ENTITIES !== 'undefined' &&
              typeof obj.__FIRST !== 'undefined' &&
              typeof obj.__SENT !== 'undefined') {
            return business._presentationCollectionFromDbo({
              dbo: obj
            });
          }
          //Returned object is an entity
          else if (obj.__KEY && obj.__STAMP) {
            return business._presentationEntityFromDbo({
              dbo: obj
            });
          }
        }
      }

      return obj;
    });
  }

  delete(): Promise<void> {
    if (!this.entity._key) {
      throw new Error('Entity.delete: can not delete unsaved entity');
    }

    return this.service.delete().then(() => {
      this.entity = null;
    });
  }

  save(): Promise<Entity> {
    let data: EntityDBO = {};

    if (this.entity._key && this.entity._stamp) {
      data.__KEY   = this.entity._key;
      data.__STAMP = this.entity._stamp;
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

  _refreshEntity({fresherEntity}: {fresherEntity: Entity}) {
    for (let prop in fresherEntity) {
      if (Object.prototype.hasOwnProperty.call(fresherEntity, prop)) {
        this.entity[prop] = fresherEntity[prop];
      }
    }
  }

  _getExpandString(): string {
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
