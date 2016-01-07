import AbstractService from './abstract-service';
import Util from '../util';

class DataClassService extends AbstractService {

  constructor({wakJSC, dataClass}) {
    super({wakJSC});

    this.dataClass = dataClass;
  }

  find(id, options) {
    if (typeof id !== 'string' && typeof id !== 'number') {
      throw new Error('DataClass.find: Invalid id type');
    }

    let optString = Util.handleOptions(options);

    return this.httpClient.get({
      uri: '/' + this.dataClass.name + '(' + id + ')' + optString
    })
      .then(res => {
        let entity = JSON.parse(res.body);
        delete entity['__entityModel'];

        Util.removeRestInfoFromEntity(entity);

        return entity;
      });
  }

  query(options) {
    let optString = Util.handleOptions(options);

    return this.httpClient.get({
      uri: '/' + this.dataClass.name + optString
    }).then(res => {
      let collection = JSON.parse(res.body);
      delete collection['__entityModel'];

      for (let entity of collection['__ENTITIES']) {
        Util.removeRestInfoFromEntity(entity);
      }

      return collection;
    });
  }
}

export default DataClassService;
