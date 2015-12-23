import EntityTransform from '../transform/entity-transform';
import Util from '../util';

class DataClassDecorator {
  constructor({httpClient, wakJSC}) {
    this.httpClient = httpClient;
    this.wakJSC = wakJSC;
  }

  addJSCMethods(dataClass) {
    dataClass.find = (id, options) => {

      if (typeof id !== 'string' && typeof id !== 'number') {
        throw new Error('DataClass.find: Invalid id type');
      }

      let optString = Util.handleOptions(options);

      return this.httpClient.get({
        uri: '/' + dataClass.name + '(' + id +')' + optString
      })
        .then(res => {
          return new EntityTransform({
            rawString: res.body,
            dataClass,
            wakJSC: this.wakJSC
          });
        });
    };
  }
}

export default DataClassDecorator;
