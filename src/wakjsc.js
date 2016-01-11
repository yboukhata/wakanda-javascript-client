import CatalogBusiness from './business/catalog-business';
import DirectoryBusiness from './business/directory-business';

class WakJSC {
  constructor(host) {
    this._httpClient = new WakJSC.HttpClient({
      apiPrefix: (host || '') + '/rest'
    });

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
