import CatalogBusiness from './business/catalog-business';
import DirectoryBusiness from './business/directory-business';
import Entity from './presentation/entity';
import Collection from './presentation/collection';

class WakJSC {
  constructor(host) {
    this._httpClient = new WakJSC.HttpClient({
      apiPrefix: (host || '') + '/rest'
    });

    let directoryBusiness = new DirectoryBusiness({
      wakJSC: this
    });

    this.directory = {
      login: (username, password, duration) => {
        return directoryBusiness.login(username, password, duration);
      },
      logout: () => {
        return directoryBusiness.logout();
      },
      currentUser: () => {
        return directoryBusiness.currentUser();
      },
      currentUserBelongsTo: (group) => {
        return directoryBusiness.currentUserBelongsTo(group);
      }
    };

    this.helper = {
      isEntity: object => {
        return object instanceof Entity;
      },
      isCollection: object => {
        return object instanceof Collection;
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
