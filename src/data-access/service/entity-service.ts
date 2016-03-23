import AbstractService from './abstract-service';
import Util from '../util';
import Entity from '../../presentation/entity';
import {DataClass} from '../../presentation/dataclass';
import {EntityDBO} from '../../business/entity-business';

class EntityService extends AbstractService {
  
  private entity: Entity;
  private dataClass: DataClass;
  
  constructor({wakJSC, entity, dataClass}) {
    super({wakJSC});

    this.entity = entity;
    this.dataClass = dataClass;
  }

  save(data: EntityDBO, expand: string): Promise<EntityDBO> {

    var expandStr = '';
    if (expand) {
      expandStr = '&$expand=' + expand;
    }

    return this.httpClient.post({
      uri: '/' + this.dataClass.name + '?$method=update' + expandStr,
      data
    }).then(res => {
      var entity = JSON.parse(res.body);
      delete entity.__entityModel;
      Util.removeRestInfoFromEntity(entity);

      return entity;
    });
  }
  
  recompute(data: EntityDBO): Promise<EntityDBO> {
   return this.httpClient.post({
     uri: '/' + this.dataClass.name + '?$method=update&$refresh=true',
     data
   }).then(res => {
     var dbo = JSON.parse(res.body);
     delete dbo.__entityModel;
     Util.removeRestInfoFromEntity(dbo);
     
     return dbo;
   });
  }

  callMethod(methodName: string, parameters: any[]): Promise<any> {
    return this.httpClient.post({
      uri: '/' + this.dataClass.name + '(' + this.entity._key + ')/' + methodName,
      data: parameters
    }).then(res => {
      let obj = JSON.parse(res.body);
      return obj.result || obj || null;
    });
  }

  delete(): Promise<boolean> {
    return this.httpClient.get({
      uri: '/' + this.dataClass.name + '(' + this.entity._key + ')?$method=delete'
    }).then(res => {
      let obj = JSON.parse(res.body);

      if (!(obj && obj.ok === true)) {
        return <any>Promise.reject(new Error());
      }
      else {
        return true;
      }
    });
  }
}

export default EntityService;
