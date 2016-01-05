import BrowserHttpClient from './data-access/http/browser-http-client';
import NodeHttpClient from './data-access/http/node-http-client';
// import {Catalog, Directory} from './api';
import CatalogBusiness from './business/catalog-business';

class WakJSC {
  constructor(host) {
    //Context detection. Are we on node or a browser ?
    let isBrowser = new Function("try { return this === window; } catch(e) { return false; }");

    var httpClient;
    if (isBrowser()) {
      httpClient = new BrowserHttpClient({
        apiPrefix: '/rest'
      });
    }
    else {
      httpClient = new NodeHttpClient({
        apiPrefix: host + '/rest'
      });
    }

    this._httpClient = httpClient;

    // this.catalog = new Catalog({
    //   httpClient,
    //   wakJSC: this
    // });
    // this.directory = new Directory({httpClient});
    //
    // this._dataclassMap = new Map();
  }

  getCatalog(dataClasses) {
    let catalogBusiness = new CatalogBusiness({
      wakJSC: this
    });

    return catalogBusiness.get(dataClasses);
  }

  version() {
    return '0.0.1';
  }
}

export default WakJSC;
