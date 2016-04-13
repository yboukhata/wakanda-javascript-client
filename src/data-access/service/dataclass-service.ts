import AbstractService from './abstract-service';
import Util from '../util';
import {QueryOption} from '../../presentation/query-option';
import {DataClass} from '../../presentation/dataclass';
import {EntityDBO} from '../../business/entity-business';
import {CollectionDBO} from '../../business/collection-business';
import {DataClassBaseService} from './base/dataclass-base-service';

class DataClassService extends AbstractService {

  private dataClass: DataClass;

  constructor({wakJSC, dataClass}) {
    super({wakJSC});

    this.dataClass = dataClass;
  }

  find(id: string|number, options: QueryOption) {
    return DataClassBaseService.find({
      httpClient: this.httpClient,
      key: id,
      options,
      dataClassName: this.dataClass.name
    });
  }

  query(options: QueryOption) {
    return DataClassBaseService.query({
      httpClient: this.httpClient,
      options,
      dataClassName: this.dataClass.name
    });
  }

  callMethod(methodName: string, parameters: any[]): Promise<any> {
    return DataClassBaseService.callMethod({
      httpClient: this.httpClient,
      dataClassName: this.dataClass.name,
      methodName,
      parameters
    });
  }
}

export default DataClassService;
