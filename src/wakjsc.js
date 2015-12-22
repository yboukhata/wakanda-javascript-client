import BrowserHttpClient from './data-access/http/browser-http-client';
import NodeHttpClient from './data-access/http/node-http-client';
import {Catalog, Directory} from './api';

class WakJSC {
  constructor() {
    //Context detection. Are we on node or a browser ?
    let isBrowser = new Function("try { return this === window; } catch(e) { return false; }");
    console.log('you seem to be on ' + (isBrowser() ? 'a browser' : 'node'));

    var httpClient;
    if (isBrowser()) {
      httpClient = new BrowserHttpClient({
        apiPrefix: '/rest'
      });
    }
    else {
      httpClient = new NodeHttpClient({
        apiPrefix: '/rest'
      });
    }

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
