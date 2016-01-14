import AbstractBusiness from './abstract-business';
import CollectionService from '../data-access/service/collection-service';

class CollectionBusiness extends AbstractBusiness {
  constructor({wakJSC, dataClass, collection, dataClassBusiness, collectionUri}) {
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
  }

  _decorateCollection() {
    this.collection.fetch = this.fetch.bind(this);

    this._addUserDefinedMethods();
  }

  fetch(options) {
    let opt = options || {};

    return this.service.fetch(opt).then(collectionDbo => {
      let fresherCollection = this.dataClassBusiness._presentationCollectionFromDbo({
        dbo: collectionDbo
      });

      this._refreshCollection({fresherCollection});
      return this.collection;
    });
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
        this.collection[prop] = fresherCollection[prop];
      }
    }
  }
}

export default CollectionBusiness;
