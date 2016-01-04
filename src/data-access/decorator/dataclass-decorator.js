import EntityTransform from '../transform/entity-transform';
import CollectionTransform from '../transform/collection-transform';
import Util from '../util';
import {Entity} from '../model/entity';

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

    dataClass.query = (options) => {
      let optString = Util.handleOptions(options);

      return this.httpClient.get({
        uri: '/' + dataClass.name + optString
      })
        .then(res => {
          return new CollectionTransform({
            rawString: res.body,
            dataClass,
            wakJSC: this.wakJSC
          });
        });
    };

    dataClass.create = (rawObj) => {
      let entity = new Entity({
        rawObj: rawObj || {},
        dataClass: dataClass,
        wakJSC: this.wakJSC
      });

      return entity;
    };
  }
}

export default DataClassDecorator;
