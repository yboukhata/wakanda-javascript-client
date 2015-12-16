import DataClass from '../dataclass';

class DataClassFactory {
  constructor({httpClient}) {
    this.httpClient = httpClient;
  }

  getDataclass(name) {
    return new DataClass({
      name,
      httpClient: this.httpClient
    });
  }
}

export default DataClassFactory;
