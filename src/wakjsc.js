import HttpClient from './data-access/http/http-client';
import {Catalog, Directory} from './api';

class WakJSC {
  constructor() {
    var httpClient = new HttpClient({
      apiPrefix: '/rest'
    });

    this.catalog = new Catalog({
      httpClient,
      wakJSC: this
    });
    this.directory = new Directory({httpClient});

    this._dataclassMap = new Map();
  }

  version() {
    return '0.0.1';
  }
}

export default WakJSC;
