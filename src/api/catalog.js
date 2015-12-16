import CatalogTransform from '../data-access/transform/catalog-transform';

class Catalog {
  constructor({httpClient}) {
    this.httpClient = httpClient;
  }

  /**
   * @param dataClasses array optional List of dataClasses to retrieve
   */
  get(dataClasses) {

    var strDataclasses = '/'
    if (Array.isArray(dataClasses)) {
      strDataclasses += dataClasses.join();
    }
    else {
      strDataclasses += '$all';
    }

    return this.httpClient.get({uri: '/$catalog' + strDataclasses})
      .then(res => {
        return new CatalogTransform({rawString: res.response});
      })
      .catch(error => {
        console.error('Catalog.get error', error);
        throw error;
      });
  }
}

export default Catalog;
