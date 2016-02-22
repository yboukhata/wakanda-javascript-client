import AbstractService from './abstract-service';
import Util from '../util';

class CollectionService extends AbstractService {
  constructor({wakJSC, collection, dataClass, collectionUri}) {
    super({wakJSC});

    this.collection = collection;
    this.dataClass = dataClass;
    this.collectionUri = collectionUri;
    this.isEntitySet = this._isEntitySetUri({uri: collectionUri});
  }

  fetch(options) {

    if (!this.isEntitySet) {
      if(options.select && options.select.length > 0) {
        throw new Error('Collection.fetch can not have "select" option when deferred');
      }
    }

    if (options.method && options.method.length > 0) {
      throw new Error('Collection.fetch can not have "method" option');
    }

    options.method = 'subentityset';

    var optString = Util.handleOptions(options);

    //Remove the first ? on optString if it's not an entitySet (because there is also
    //?$expand=... on collectionUri), and add a &
    if (!this.isEntitySet) {
      optString = '&' + optString.slice(1);
    }

    //Remove the /rest/ part of the URI as our service will add it on its own
    let uri = this.collectionUri.slice(5);

    return this.httpClient.get({
      uri: uri + optString
    }).then(res => {
      let obj = JSON.parse(res.body);

      if (obj.__ENTITYSET) {
        this.collectionUri = obj.__ENTITYSET;
        this.isEntitySet = this._isEntitySetUri({uri: obj.__ENTITYSET});
      }

      delete obj.__entityModel;

      for (let entity of obj.__ENTITIES) {
        Util.removeRestInfoFromEntity(entity);
      }

      return obj;
    });
  }

  _isEntitySetUri({uri}) {
    return /^\/rest\/\w+\/\$entityset\/[A-Z0-9]+(\?.*)?$/i.test(uri);
  }
}

export default CollectionService;
