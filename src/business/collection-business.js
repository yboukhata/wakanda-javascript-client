import AbstractBusiness from './abstract-business';
import CollectionService from '../data-access/service/collection-service';

class CollectionBusiness extends AbstractBusiness {
  constructor({wakJSC, dataClass, collection, dataClassBusiness}) {
    super({wakJSC});

    this.collection = collection;
    this.dataClass = dataClass;
    this.dataClassBusiness = dataClassBusiness;
    this.service = new CollectionService({
      wakJSC,
      collection,
      dataClass
    });
  }

  _decorateCollection() {
    this._addUserDefinedMethods();
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
}

export default CollectionBusiness;
