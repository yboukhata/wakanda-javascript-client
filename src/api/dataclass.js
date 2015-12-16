import EntityTransform from '../data-access/transform/entity-transform';

class DataClass {
  constructor({name, httpClient}) {
    this.name = name;
    this.httpClient = httpClient;
  }

  find(id, options) {
    return this.httpClient.get({
      uri: '/' + this.name + '(' + id +')'
    })
      .then(res => {
        return new EntityTransform({rawString: res.response});
      })
      .catch(err => {
        console.error('dataclass.find ', err);
        throw err;
      });
  }
}

export default DataClass;
