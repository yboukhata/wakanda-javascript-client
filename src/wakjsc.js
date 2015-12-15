import HttpClient from './data-access/http/http-client';
import {Catalog} from './api';

class WakJSC {
  constructor() {
    var httpClient = new HttpClient({
      apiPrefix: '/rest'
    });

    this.catalog = new Catalog({httpClient});
  }

  version() {
    return '0.0.1';
  }
}

export default WakJSC;
