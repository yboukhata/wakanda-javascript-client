import AbstractService from './abstract-service';
import {DataClassDBO} from '../../business/catalog-business';
import {CatalogBaseService} from './base/catalog-base-service';

class CatalogService extends AbstractService {
  
  get(dataClasses?: string| string[]) {
    return CatalogBaseService.get({
      httpClient: this.httpClient,
      dataClasses
    });
  }
}

export default CatalogService;
