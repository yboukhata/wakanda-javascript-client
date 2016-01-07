import AbstractService from './abstract-service';
import Util from '../util';

class EntityService extends AbstractService {
  constructor({wakJSC, entity, dataClass}) {
    super({wakJSC});

    this.entity = entity;
    this.dataClass = dataClass;
  }

  save(data, expand) {

    var expandStr = '';
    if (expand) {
      expandStr = '&$expand=' + expand;
    }

    return this.httpClient.post({
      uri: '/' + this.dataClass.name + '?$method=update' + expandStr,
      data
    }).then(res => {
      var entity = JSON.parse(res.body);
      delete entity['__entityModel'];
      Util.removeRestInfoFromEntity(entity);

      return entity;
    });
  }

  callMethod(methodName, parameters) {
    return this.httpClient.post({
      uri: '/' + this.dataClass.name + '(' + this.entity._key + ')/' + methodName,
      data: parameters
    }).then(res => {
      let obj = JSON.parse(res.body);
      return obj.result || null;
    });
  }
}

export default EntityService;
