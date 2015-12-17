import EntityTransform from '../transform/entity-transform';
import Util from '../util';

class DataClassDecorator {
  constructor({httpClient}) {
    this.httpClient = httpClient;
  }

  addJSCMethods(dataClass) {
    dataClass.find = (id, options) => {

      let optString = Util.handleOptions(options);

      return this.httpClient.get({
        uri: '/' + dataClass.name + '(' + id +')' + optString
      })
        .then(res => {
          return new EntityTransform({rawString: res.response});
        })
        .catch(err => {
          console.error('dataclass.find ', err);
          throw err;
        });
    };
  }
}

export default DataClassDecorator;
