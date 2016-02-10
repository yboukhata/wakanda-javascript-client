import AbstractBusiness from './abstract-business';
import CollectionService from '../data-access/service/collection-service';
import Const from '../const';

class CollectionBusiness extends AbstractBusiness {
  constructor({wakJSC, dataClass, collection, dataClassBusiness, collectionUri, pageSize}) {
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
  }

  _decorateCollection() {
    this.collection.fetch = this.fetch.bind(this);
    this.collection.nextPage = this.nextPage.bind(this);
    this.collection.prevPage = this.prevPage.bind(this);
    this.collection.more = this.more.bind(this);

    this._addUserDefinedMethods();
  }

  fetch(options) {
    let opt = options || {};

    if (!opt.pageSize) {
      opt.pageSize = Const.DEFAULT_PAGE_SIZE;
    }
    this.pageSize = opt.pageSize;

    return this.service.fetch(opt).then(collectionDbo => {
      let fresherCollection = this.dataClassBusiness._presentationCollectionFromDbo({
        dbo: collectionDbo
      });

      this._refreshCollection({fresherCollection});
      return this.collection;
    });
  }

  more() {

    if (this.collection._deferred === true) {
      throw new Error('Collection.more: can not call more on a deferred collection');
    }

    let options = {
      start: this.collection._first + this.collection._sent,
      pageSize: this.pageSize
    };

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

  nextPage() {

    if (this.collection._deferred === true) {
      throw new Error('Collection.nextPage: can not call nextPage on a deferred collection');
    }

    let options = {
      start: this.collection._first + this.pageSize,
      pageSize: this.pageSize
    };

    return this.fetch(options);
  }

  prevPage() {

    if (this.collection._deferred === true) {
      throw new Error('Collection.prevPage: can not call prevPage on a deferred collection');
    }

    let options = {
      start: this.collection._first - this.pageSize,
      pageSize: this.pageSize
    };

    return this.fetch(options);
  }

  _addUserDefinedMethods() {
    // let _this = this;
    for (let method of this.dataClassBusiness.methods.collection) {
      //Voluntary don't use fat arrow notation to use arguments object without a bug
      this.collection[method] = function() {

        throw new Error('Not yet implemented');
        // let params = Array.from(arguments);
        // return _this.callMethod(method, params);
      };
    }
  }

  // callMethod(methodName, parameters) {
  //   return this.service.callMethod(methodName, parameters);
  // }

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
