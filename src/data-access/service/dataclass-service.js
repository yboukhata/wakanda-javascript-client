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
      uri: '/' + this.dataClass.name + '(' + id ')' + optString
    })
      .then(res => {
        //TODO
      });
  }
}

export default DataClassService;
