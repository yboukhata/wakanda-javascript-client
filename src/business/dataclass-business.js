import AbstractBusiness from './abstract-business';
import EntityBusiness from './entity-business';
import DataClassService from '../data-access/service/dataclass-service';
import CollectionBusiness from './collection-business';
import MediaBusiness from './media-business';
import Entity from '../presentation/entity';
import Collection from '../presentation/collection';
import {AttributeRelated, AttributeCollection} from '../presentation/dataclass';
import Media from '../presentation/media';
import Const from '../const';

//This map stores all DataClassBusiness instances of existing dataClasses
let _dataClassBusinessMap = new Map();

class DataClassBusiness extends AbstractBusiness {
  constructor({wakJSC, dataClass, methods}) {
    super({wakJSC});

    this.dataClass = dataClass;
    this.methods = methods;
    this.service = new DataClassService({
      wakJSC: this.wakJSC,
      dataClass
    });

    _dataClassBusinessMap.set(dataClass.name, this);
    this._dataClassBusinessMap = _dataClassBusinessMap;
  }

  _decorateDataClass() {
    //Do not forget to bind(this) to have "this" pointing on business object
    //instead of given dataclass object
    this.dataClass.find    = this.find.bind(this);
    this.dataClass.query   = this.query.bind(this);
    this.dataClass.create  = this.create.bind(this);

    this._addUserDefinedMethods();
  }

  _addUserDefinedMethods() {
    let _this = this;
    for (let method of this.methods.dataClass) {
      //Voluntary don't use fat arrow notation to use arguments object without a bug
      this.dataClass[method] = function() {
        let params = Array.from(arguments);
        return _this.callMethod(method, params);
      };
    }
  }

  callMethod(methodName, parameters) {
    return this.service.callMethod(methodName, parameters)
      .then(obj => {

        if (obj && obj.__entityModel) {
          let business = _dataClassBusinessMap.get(obj.__entityModel);

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

  find(id, options) {
    let opt = options || {};

    return this.service.find(id, opt).then(entity => {
      return this._presentationEntityFromDbo({
        dbo: entity
      });
    });
  }

  query(options) {
    let opt = options || {};
    let initialSelect = opt.select;

    if (!opt.pageSize) {
      opt.pageSize = Const.DEFAULT_PAGE_SIZE;
    }

    return this.service.query(opt).then(collection => {
      return this._presentationCollectionFromDbo({
        dbo: collection,
        pageSize: opt.pageSize,
        initialSelect
      });
    });
  }

  create(pojo) {
    var entityToAttach = {};
    for (let prop in pojo) {
      if (pojo[prop] instanceof Entity) {
        entityToAttach[prop] = pojo[prop];
        delete pojo[prop];
      }
    }

    let entity = this._presentationEntityFromDbo({
      dbo: pojo || {}
    });

    for (let prop in entityToAttach) {
      if (Object.prototype.hasOwnProperty.call(entityToAttach, prop)) {
        entity[prop] = entityToAttach[prop];
      }
    }

    return entity;
  }

  _createEntity({key, deferred}) {

    let entity = new Entity({
      key,
      deferred,
      dataClass: this.dataClass
    });
    let business = new EntityBusiness({
      wakJSC: this.wakJSC,
      dataClass: this.dataClass,
      entity,
      dataClassBusiness: this
    });
    business._decorateEntity();

    return entity;
  }

  _createCollection({uri, deferred, pageSize, initialSelect}) {

    let collection = new Collection({
        deferred: deferred,
        dataClass: this.dataClass
      });
    let business = new CollectionBusiness({
      wakJSC: this.wakJSC,
      dataClass: this.dataClass,
      dataClassBusiness: this,
      collection,
      collectionUri: uri,
      pageSize,
      initialSelect
    });
    business._decorateCollection();

    return collection;
  }

  _createMedia({uri, isImage, attributeName, entity}) {
    let media = new Media({uri});
    let business = new MediaBusiness({
      wakJSC: this.wakJSC,
      media,
      dataClassBusiness: this,
      isImage,
      attributeName,
      entity
    });

    business._decorateMedia();

    return media;
  }

  _presentationEntityFromDbo({dbo}) {
    var entity;

    if (!dbo) {
      entity = null;
    }
    if (dbo.__deferred) {
      entity = this._createEntity({
        key: dbo.__deferred.__KEY,
        deferred: true
      });
    }
    else {
      entity = this._createEntity({
        key: dbo.__KEY
      });
      entity._stamp = dbo.__STAMP;

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
          else if (attr.type === 'image' || attr.type === 'blob') {
            var uri;
            if (dboAttribute && dboAttribute.__deferred && dboAttribute.__deferred.uri) {
              uri = dboAttribute.__deferred.uri;
            }
            else {
              uri = null;
            }
            entity[attr.name] = this._createMedia({
              uri,
              isImage: attr.type === 'image',
              attributeName: attr.name,
              entity
            });
          }
          else {
            entity[attr.name] = dboAttribute || null;
          }
        }
        else {
          //Even if the property is null, we need a media for this kind of attributes
          //to handle the upload part
          if (attr.type === 'image' || attr.type === 'blob') {
            entity[attr.name] = this._createMedia({
              uri: null,
              isImage: attr.type === 'image',
              attributeName: attr.name,
              entity
            });
          }
          else {
            entity[attr.name] = null;
          }
        }
      }
    }

    return entity;
  }

  _presentationCollectionFromDbo({dbo, pageSize, initialSelect}) {
    var collection;

    if (!dbo) {
      collection = null;
    }
    else if (dbo.__deferred) {
      collection = this._createCollection({
        deferred: true,
        uri: dbo.__deferred.uri
      });
    }
    else {
      collection = this._createCollection({
        uri: dbo.__ENTITYSET,
        pageSize: pageSize || dbo.__ENTITIES.length,
        initialSelect
      });
      collection._count     = dbo.__COUNT;
      collection._first     = dbo.__FIRST;
      collection._sent      = dbo.__SENT;
      collection._pageSize  = pageSize;

      for (let dboEntity of dbo.__ENTITIES) {
        collection.entities.push(this._presentationEntityFromDbo({
          dbo: dboEntity
        }));
      }
    }

    return collection;
  }
}

export default DataClassBusiness;
