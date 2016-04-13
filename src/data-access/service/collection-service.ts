import AbstractService from './abstract-service';
import Util from '../util';
import Collection from '../../presentation/collection';
import {DataClass} from '../../presentation/dataclass';
import {QueryOption} from '../../presentation/query-option';
import {CollectionDBO} from '../../business/collection-business';
import {CollectionBaseService, isEntitySetUri} from './base/collection-base-service';

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
    this.isEntitySet = isEntitySetUri(collectionUri);
  }

  fetch(options: QueryOption): Promise<CollectionDBO> {

    return CollectionBaseService.fetch({
      httpClient: this.httpClient,
      collectionUri: this.collectionUri,
      isEntitySet: this.isEntitySet,
      options
    })
      .then(dbo => {
        
        if (dbo.__ENTITYSET) {
          this.collectionUri = dbo.__ENTITYSET;
          this.isEntitySet = isEntitySetUri(dbo.__ENTITYSET);
        }
        
        return dbo;
      });
  }
  
  public callMethod(methodName: string, parameters: any[]): Promise<any> {
    return CollectionBaseService.callMethod({
      httpClient: this.httpClient,
      collectionUri: this.collectionUri,
      isEntitySet: this.isEntitySet,
      methodName,
      parameters
    });
  }
}

export default CollectionService;
