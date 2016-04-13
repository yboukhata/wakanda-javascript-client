import AbstractService from './abstract-service';
import Util from '../util';
import Entity from '../../presentation/entity';
import {DataClass} from '../../presentation/dataclass';
import {EntityDBO} from '../../business/entity-business';
import {EntityBaseService} from './base/entity-base-service';

class EntityService extends AbstractService {
  
  private entity: Entity;
  private dataClass: DataClass;
  
  constructor({wakJSC, entity, dataClass}) {
    super({wakJSC});

    this.entity = entity;
    this.dataClass = dataClass;
  }

  save(data: EntityDBO, expand: string) {
    return EntityBaseService.save({
      httpClient: this.httpClient,
      dataClassName: this.dataClass.name,
      expand,
      data
    });
  }
  
  recompute(data: EntityDBO) {
   return EntityBaseService.recompute({
      httpClient: this.httpClient,
      dataClassName: this.dataClass.name,
      data
    });
  }

  callMethod(methodName: string, parameters: any[]) {
    return EntityBaseService.callMethod({
      httpClient: this.httpClient,
      dataClassName: this.dataClass.name,
      methodName,
      parameters,
      entityKey: this.entity._key
    });
  }

  delete() {
    return EntityBaseService.delete({
      httpClient: this.httpClient,
      dataClassName: this.dataClass.name,
      entityKey: this.entity._key
    });
  }
}

export default EntityService;
