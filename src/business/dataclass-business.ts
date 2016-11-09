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
import {ICollectionDBO} from './collection-business';
import {DataClass} from '../presentation/dataclass';
import {QueryOption} from '../presentation/query-option';
import {IEntityDBO} from './entity-business';
import {MethodAdapter} from './method-adapter';
import WakandaClient from '../wakanda-client';
import Util from './util';


//This map stores all DataClassBusiness instances of existing dataClasses
let _dataClassBusinessMap = new Map<string, DataClassBusiness>();

export interface IMethodsArray {
  entity: string[];
  collection: string[];
  dataClass: string[];
}

class DataClassBusiness extends AbstractBusiness {

  public dataClass: DataClass;
  public methods: IMethodsArray;
  public _dataClassBusinessMap: Map<string, DataClassBusiness>;
  public dataURI: string;

  private service: DataClassService;

  constructor({wakJSC, dataClass, methods, dataURI}:
  {wakJSC: WakandaClient, dataClass: DataClass, methods: IMethodsArray, dataURI: string}) {
    super({wakJSC});

    this.dataClass = dataClass;
    this.methods = methods;
    this.service = new DataClassService({
      wakJSC: this.wakJSC,
      dataClassBusiness: this
    });
    this.dataURI = dataURI;

    _dataClassBusinessMap.set(dataClass.name, this);
    this._dataClassBusinessMap = _dataClassBusinessMap;
  }

  public _decorateDataClass() {
    //Do not forget to bind(this) to have "this" pointing on business instance
    //instead of given dataclass instance
    this.dataClass.find    = this.find.bind(this);
    this.dataClass.query   = this.query.bind(this);
    this.dataClass.create  = this.create.bind(this);

    this._addUserDefinedMethods();
  }

  private _addUserDefinedMethods() {
    let self = this;

    this.methods.dataClass.forEach(method => {
      //Voluntary don't use fat arrow notation to use arguments object without a bug
      this.dataClass[method] = function() {
        let params = Array.from(arguments);
        return self.callMethod(method, params);
      };
    });
  }

  public callMethod(methodName: string, parameters: any[]): Promise<Entity|Collection|any> {
    return this.service.callMethod(methodName, parameters)
      .then(obj => {
        return MethodAdapter.transform(obj, this._dataClassBusinessMap);
      });
  }

  public find(id: string|number, options?: QueryOption): Promise<Entity> {
    let opt = options || {};

    if (opt.filter !== undefined || opt.params !== undefined || opt.pageSize !== undefined ||
      opt.start !== undefined || opt.orderBy !== undefined) {
      throw new Error('Dataclass.find: options filter, params, pageSize, start and orderBy are not allowed');
    }

    return this.service.find(id, opt).then(entity => {
      return this._presentationEntityFromDbo({
        dbo: entity
      });
    });
  }

  public query(options?: QueryOption): Promise<Collection> {
    let opt = options || {};
    let initialSelect = opt.select;

    if (opt.method && opt.method.length > 0) {
      throw new Error('Dataclass.query: option method is not allowed');
    }

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

  public create(pojo?: any): Entity {
    let entityToAttach: any = {};

    if (pojo) {
      for (let prop in pojo) {
        if (pojo[prop] instanceof Entity) {
          entityToAttach[prop] = pojo[prop];
          delete pojo[prop];
        }
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

  private _createEntity({key, deferred, dbo}: {key: string, deferred?: boolean, dbo?: IEntityDBO}): Entity {

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

    if (!deferred) {
      this._populateEntityDataFromDbo({
        dbo: dbo,
        entity: entity
      });
      business._flashEntityValues();
    }
    return entity;
  }

  private _createCollection({uri, deferred, pageSize, initialSelect}:
    {uri: string, deferred?: boolean, pageSize?: number, initialSelect?: string}): Collection {

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

  public _createMedia({uri, isImage, attributeName, entity}:
   {uri: string, isImage: boolean, attributeName: string, entity: Entity}): Media {

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

  private _populateEntityDataFromDbo({dbo, entity}: {dbo: IEntityDBO, entity: Entity}): Entity {
      entity._stamp = dbo.__STAMP;
      for (let attr of this.dataClass.attributes) {

        let dboAttribute = dbo[attr.name];

        if (dboAttribute !== null && dboAttribute !== undefined) {
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
            let uri: string;

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
          else if (attr.type === 'date') {
            if (!dboAttribute) {
              entity[attr.name] = null;
            } else {
              entity[attr.name] = attr.simpleDate ? Util.wakParseSimpleDate(dboAttribute) : new Date(dboAttribute);
            }
          }
          else {
            entity[attr.name] = dboAttribute;
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
      return entity;
  }

  public _presentationEntityFromDbo({dbo}: {dbo: IEntityDBO}): Entity {
    let entity: Entity;

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
        key: dbo.__KEY,
        dbo: dbo
      });
    }

    return entity;
  }

  public _presentationCollectionFromDbo({dbo, pageSize, initialSelect}:
    {dbo: ICollectionDBO, pageSize?: number, initialSelect?: string}): Collection {

    let collection: Collection;

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
