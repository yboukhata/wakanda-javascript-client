import AbstractBusiness from './abstract-business';
import CollectionService from '../data-access/service/collection-service';
import Const from '../const';
import {EntityDBO} from './entity-business';
import Collection from '../presentation/collection';
import {DataClass} from '../presentation/dataclass';
import DataClassBusiness from './dataclass-business';
import {QueryOption} from '../presentation/query-option';

export interface CollectionDBO {
  __ENTITYSET: string;
  __COUNT: number;
  __FIRST: number;
  __SENT: number;
  __ENTITIES: EntityDBO[];
  __deferred: {uri: string};
  
  [key: string]: any;
}

class CollectionBusiness extends AbstractBusiness {
  
  private collection: Collection;
  private dataClass: DataClass;
  private dataClassBusiness: DataClassBusiness;
  private service: CollectionService;
  private pageSize: number;
  private initialSelect: string;
  
  constructor({wakJSC, dataClass, collection, dataClassBusiness, collectionUri, pageSize, initialSelect}) {
    super({wakJSC});

    this.collection = collection;
    this.dataClass = dataClass;
    this.dataClassBusiness = dataClassBusiness;
    this.service = new CollectionService({
      wakJSC,
      collection,
      dataClass,
      collectionUri
    });
    this.pageSize = pageSize;
    this.initialSelect = initialSelect;
  }

  _decorateCollection() {
    this.collection.fetch = this.fetch.bind(this);
    this.collection.nextPage = this.nextPage.bind(this);
    this.collection.prevPage = this.prevPage.bind(this);
    this.collection.more = this.more.bind(this);

    this._addUserDefinedMethods();
  }

  fetch(options?: QueryOption): Promise<Collection> {
    let opt = options || {};

    if (opt.method && opt.method.length > 0) {
      throw new Error('Collection.fetch: option method is not allowed');
    }

    if (!opt.pageSize) {
      opt.pageSize = this.pageSize ? this.pageSize : Const.DEFAULT_PAGE_SIZE;
    }

    if (opt.select) {
      this.initialSelect = opt.select;
    }
    
    this.pageSize = opt.pageSize;

    return this.service.fetch(opt).then(collectionDbo => {
      let fresherCollection = this.dataClassBusiness._presentationCollectionFromDbo({
        dbo: collectionDbo,
        pageSize: this.pageSize
      });

      this._refreshCollection({fresherCollection});
      return this.collection;
    });
  }

  more(): Promise<Collection> {

    if (this.collection._deferred === true) {
      throw new Error('Collection.more: can not call more on a deferred collection');
    }

    let options: QueryOption = {
      start: this.collection._first + this.collection._sent,
      pageSize: this.pageSize
    };

    if (this.initialSelect) {
      options.select = this.initialSelect;
    }

    return this.service.fetch(options)
      .then(dbo => {
        this.collection._sent += dbo.__ENTITIES.length;

        for (let entity of dbo.__ENTITIES) {
          this.collection.entities.push(this.dataClassBusiness._presentationEntityFromDbo({
            dbo: entity
          }));
        }

        return this.collection;
      });
  }

  nextPage(): Promise<Collection> {

    if (this.collection._deferred === true) {
      throw new Error('Collection.nextPage: can not call nextPage on a deferred collection');
    }

    let options: QueryOption = {
      start: this.collection._first + this.pageSize,
      pageSize: this.pageSize
    };

    if (this.initialSelect) {
      options.select = this.initialSelect;
    }

    return this.fetch(options);
  }

  prevPage(): Promise<Collection> {

    if (this.collection._deferred === true) {
      throw new Error('Collection.prevPage: can not call prevPage on a deferred collection');
    }

    let options: QueryOption = {
      start: this.collection._first - this.pageSize,
      pageSize: this.pageSize
    };

    if (this.initialSelect) {
      options.select = this.initialSelect;
    }

    return this.fetch(options);
  }

  _addUserDefinedMethods() {
    let _this_ = this;
    this.dataClassBusiness.methods.collection.forEach(method => {
      //Voluntary don't use fat arrow notation to use arguments object without a bug
      this.collection[method] = function() {
        let params = Array.from(arguments);
        return _this_.callMethod(method, params);
      };
    });
  }

  callMethod(methodName: string, parameters: any[]) {
    return this.service.callMethod(methodName, parameters);
  }

  _refreshCollection({fresherCollection}) {
    for (let prop in fresherCollection) {
      if (Object.prototype.hasOwnProperty.call(fresherCollection, prop)) {
        if (typeof fresherCollection[prop] !== 'function') {
          this.collection[prop] = fresherCollection[prop];
        }
      }
    }
  }
}

export default CollectionBusiness;
