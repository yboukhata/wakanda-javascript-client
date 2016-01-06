import BrowserHttpClient from './data-access/http/browser-http-client';
import NodeHttpClient from './data-access/http/node-http-client';
import CatalogBusiness from './business/catalog-business';
import DirectoryBusiness from './business/directory-business';

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

    let directoryBusiness = new DirectoryBusiness({
      wakJSC: this
    });

    this.directory = {
      login: (username, password) => {
        return directoryBusiness.login(username, password);
      }
    };
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
