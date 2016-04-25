import AbstractService from './abstract-service';
import Util from '../util';
import Collection from '../../presentation/collection';
import {DataClass} from '../../presentation/dataclass';
import {QueryOption} from '../../presentation/query-option';
import {CollectionDBO} from '../../business/collection-business';

class CollectionService extends AbstractService {
  
  private collection: Collection;
  private dataClass: DataClass;
  private collectionUri: string;
  private isEntitySet: boolean;
  
  constructor({wakJSC, collection, dataClass, collectionUri}) {
    super({wakJSC});

    this.collection = collection;
    this.dataClass = dataClass;
    this.collectionUri = collectionUri;
    this.isEntitySet = this._isEntitySetUri({uri: collectionUri});
  }

  fetch(options: QueryOption): Promise<CollectionDBO> {

    if (!this.isEntitySet) {
      if(options.select && options.select.length > 0) {
        throw new Error('Collection.fetch: option select is not allowed when collection is deferred');
      }
    }

    options.method = 'subentityset';

    var optString = Util.handleOptions(options);

    //Remove the first ? on optString if it's not an entitySet (because there is also
    //?$expand=... on collectionUri), and add a &
    if (!this.isEntitySet) {
      optString = '&' + optString.slice(1);
    }

    //Remove the /rest/ part of the URI as our service will add it on its own
    // let uri = this.collectionUri.slice(5);
    let uri = this._removeRestFromUri(this.collectionUri);

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
  
  public callMethod(methodName: string, parameters: any[]): Promise<any> {
    //Two cases. If it's an entity set, just call the method
    //If not, call it with emMethod and subentityset parameters
    let uri = this._removeRestFromUri(this.collectionUri);
    
    if (this.isEntitySet) {
      uri += '/' + methodName;
    }
    else {
      let optString = Util.handleOptions({
        method: 'subentityset',
        emMethod: methodName
      });
      
      uri += '&' + optString.slice(1);
    }
    
    return this.httpClient.post({
        uri,
        data: parameters
      }).then(res => {
        let obj = JSON.parse(res.body);
        return obj.result || obj || null;
      });
  }
  
  private _removeRestFromUri(uri: string): string {
    return uri.slice(5);
  }

  _isEntitySetUri({uri}: {uri: string}): boolean {
    return /^\/rest\/\w+\/\$entityset\/[A-Z0-9]+(\?.*)?$/i.test(uri);
  }
}

export default CollectionService;
