import CatalogTransform from '../data-access/transform/catalog-transform';
import DataClassDecorator from '../data-access/decorator/dataclass-decorator';

class Catalog {
  constructor({httpClient, wakJSC}) {
    this.httpClient = httpClient;
    this.wakJSC = wakJSC;
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
          httpClient: this.httpClient,
          wakJSC: this.wakJSC
        });

        for (let dcName in catalog) {
          dcDecorator.addJSCMethods(catalog[dcName]);

          //Adding dataClasses to map on WakJSc instance to make them accessible
          //accross whole module
          this.wakJSC._dataclassMap.set(dcName, catalog[dcName]);
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
