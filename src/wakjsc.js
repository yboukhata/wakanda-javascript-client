import HttpClient from './data-access/http/http-client';
import {Catalog, Directory, DataClassFactory} from './api';

class WakJSC {
  constructor() {
    var httpClient = new HttpClient({
      apiPrefix: '/rest'
    });

    this.catalog = new Catalog({httpClient});
    this.directory = new Directory({httpClient});
    this.dataclassFactory = new DataClassFactory({httpClient});
  }

  version() {
    return '0.0.1';
  }
}

export default WakJSC;
