import EntityTransform from '../transform/entity-transform';
import Util from '../util';

class DataClassDecorator {
  constructor({httpClient, wakJSC}) {
    this.httpClient = httpClient;
    this.wakJSC = wakJSC;
  }

  addJSCMethods(dataClass) {
    dataClass.find = (id, options) => {

      let optString = Util.handleOptions(options);

      return this.httpClient.get({
        uri: '/' + dataClass.name + '(' + id +')' + optString
      })
        .then(res => {
          return new EntityTransform({
            rawString: res.response,
            dataClass,
            wakJSC: this.wakJSC
          });
        })
        .catch(err => {
          console.error('dataclass.find ', err);
          throw err;
        });
    };
  }
}

export default DataClassDecorator;
