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
        let obj = JSON.parse(res.body);
        delete obj['__entityModel'];

        for (let prop in obj) {
          let p = obj[prop];
          if (p && p['__deferred']) {
            delete p['__deferred']['uri'];
          }
        }

        return obj;
      });
  }
}

export default DataClassService;
