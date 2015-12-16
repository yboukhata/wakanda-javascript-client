import EntityTransform from '../transform/entity-transform';

class DataClassDecorator {
  constructor({httpClient}) {
    this.httpClient = httpClient;
  }

  addJSCMethods(dataClass) {
    dataClass.find = (id, options) => {

      //TODO - Add options handling
      
      return this.httpClient.get({
        uri: '/' + dataClass.name + '(' + id +')'
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
