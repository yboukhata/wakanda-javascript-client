import CatalogTransform from '../data-access/transform/catalog-transform';
import DataClassDecorator from '../data-access/decorator/dataclass-decorator';

class Catalog {
  constructor({httpClient}) {
    this.httpClient = httpClient;
  }

  /**
   * @param dataClasses array optional List of dataClasses to retrieve
   */
  get(dataClasses) {

    var strDataclasses = '/';
    if (Array.isArray(dataClasses)) {
      strDataclasses += dataClasses.join();
    }
    else {
      strDataclasses += '$all';
    }

    return this.httpClient.get({uri: '/$catalog' + strDataclasses})
      .then(res => {
        let catalog = new CatalogTransform({rawString: res.response});
        let dcDecorator = new DataClassDecorator({
          httpClient: this.httpClient
        });

        for (let dcName in catalog) {
          dcDecorator.addJSCMethods(catalog[dcName]);
        }

        return catalog;
      })
      .catch(error => {
        console.error('Catalog.get error', error);
        throw error;
      });
  }
}

export default Catalog;
