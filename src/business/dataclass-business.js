import AbstractBusiness from './abstract-business';
import DataClassService from '../data-access/service/dataclass-service';
import {Entity, DeferredEntity} from '../presentation/entity';
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

  _presentationEntityFromDbo({dbo}) {
    var entity;

    if (!dbo) {
      entity = null;
    }
    if (dbo['__deferred']) {
      entity = new DeferredEntity({
        key: dbo['__deferred']['__KEY']
      });
    }
    else {
      entity = new Entity({
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
    return null;
  }

  _decorateDataClass(dataClass) {
    //Do not forget to bind(this) to have "this" pointing on business object
    //instead of given dataclass object
    dataClass.find = this.find.bind(this);
  }
}

export default DataClassBusiness;
