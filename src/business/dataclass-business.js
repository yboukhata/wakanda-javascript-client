import AbstractBusiness from './abstract-business';
import DataClassService from '../data-access/service/dataclass-service';
import {Entity, DeferredEntity} from '../presentation/entity';
import {Collection, DeferredCollection} from '../presentation/collection';
import {AttributeRelated, AttributeCollection} from '../presentation/dataclass';

//This map stores all DataClassBusiness instances of existing dataClasses
let _dataClassBusinessMap = new Map();

class DataClassBusiness extends AbstractBusiness {
  constructor({wakJSC, dataClass}) {
    super({wakJSC});

    this.dataClass = dataClass;
    this.service = new DataClassService({
      wakJSC: this.wakJSC,
      dataClass
    });

    _dataClassBusinessMap.set(dataClass.name, this);
  }

  find(id, options) {
    return this.service.find(id, options).then(entity => {
      return this._presentationEntityFromDbo({
        dbo: entity
      });
    });
  }

  _createEntity({key, deferred}) {
    if (deferred === true) {
      return new DeferredEntity({key});
    }
    else {
      return new Entity({key});
    }

    //TODO - Adding framework methods
  }

  _createCollection(options) {
    if (options && options.deferred === true) {
      return new DeferredCollection();
    }
    else {
      return new Collection();
    }

    //TODO - Adding framework methods
  }

  _presentationEntityFromDbo({dbo}) {
    var entity;

    if (!dbo) {
      entity = null;
    }
    if (dbo['__deferred']) {
      entity = this._createEntity({
        key: dbo['__deferred']['__KEY'],
        deferred: true
      });
    }
    else {
      entity = this._createEntity({
        key: dbo['__KEY']
      });
      entity['_stamp'] = dbo['__STAMP'];

      for (let attr of this.dataClass.attributes) {

        let dboAttribute = dbo[attr.name];

        if (dboAttribute) {
          if (attr instanceof AttributeRelated) {
            //Kind of recursive call with a potententialy different instance of
            //DataClassBusiness
            let business = _dataClassBusinessMap.get(attr.type);
            entity[attr.name] = business._presentationEntityFromDbo({
              dbo: dboAttribute
            });
          }
          else if (attr instanceof AttributeCollection) {
            let business = _dataClassBusinessMap.get(attr.entityType);
            entity[attr.name] = business._presentationCollectionFromDbo({
              dbo: dboAttribute
            });
          }
          else {
            entity[attr.name] = dboAttribute || null;
          }
        }
        else {
          entity[attr.name] = null;
        }
      }
    }

    return entity;
  }

  _presentationCollectionFromDbo({dbo}) {
    var collection;

    if (!dbo) {
      collection = null;
    }
    else if (dbo['__deferred']) {
      collection = this._createCollection({
        deferred: true
      });
    }
    else {
      collection = this._createCollection();
      collection['_count'] = dbo['__COUNT'];
      collection['_first'] = dbo['__FIRST'];
      collection['_sent']  = dbo['__SENT'];

      for (let dboEntity of dbo['__ENTITIES']) {
        collection.entities.push(this._presentationEntityFromDbo({
          dbo: dboEntity
        }));
      }
    }

    return collection;
  }

  _decorateDataClass(dataClass) {
    //Do not forget to bind(this) to have "this" pointing on business object
    //instead of given dataclass object
    dataClass.find = this.find.bind(this);
  }
}

export default DataClassBusiness;
