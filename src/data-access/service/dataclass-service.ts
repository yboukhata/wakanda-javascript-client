import AbstractService from './abstract-service';
import Util from '../util';
import {QueryOption} from '../../presentation/query-option';
import {DataClass} from '../../presentation/dataclass';
import {EntityDBO} from '../../business/entity-business';
import {CollectionDBO} from '../../business/collection-business';

class DataClassService extends AbstractService {

  private dataClass: DataClass;

  constructor({wakJSC, dataClass}) {
    super({wakJSC});

    this.dataClass = dataClass;
  }

  find(id: string|number, options: QueryOption): Promise<EntityDBO> {
    
    if (typeof id !== 'string' && typeof id !== 'number') {
      throw new Error('DataClass.find: Invalid id type');
    }

    let optString = Util.handleOptions(options);

    return this.httpClient.get({
      uri: '/' + this.dataClass.name + '(' + id + ')' + optString
    })
      .then(res => {
        let entity = JSON.parse(res.body);
        delete entity.__entityModel;

        Util.removeRestInfoFromEntity(entity);

        return entity;
      });
  }

  query(options: QueryOption): Promise<CollectionDBO> {

    options.method = 'entityset';

    let optString = Util.handleOptions(options);

    return this.httpClient.get({
      uri: '/' + this.dataClass.name + optString
    }).then(res => {
      let collection = JSON.parse(res.body);
      delete collection.__entityModel;

      for (let entity of collection.__ENTITIES) {
        Util.removeRestInfoFromEntity(entity);
      }

      return collection;
    });
  }

  callMethod(methodName: string, parameters: any[]): Promise<any> {
    return this.httpClient.post({
      uri: '/' + this.dataClass.name + '/' + methodName,
      data: parameters
    }).then(res => {
      let obj = JSON.parse(res.body);
      return obj.result || obj || null;
    });
  }
}

export default DataClassService;
