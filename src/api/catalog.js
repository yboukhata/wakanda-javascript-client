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
    else if (typeof dataClasses === 'undefined') {
      strDataclasses += '$all';
    }
    else {
      throw new Error('Catalog.get: first parameter should be an array');
    }

    return this.httpClient.get({uri: '/$catalog' + strDataclasses})
      .then(res => {
        let catalog = new CatalogTransform({rawString: res.body});
        let dcDecorator = new DataClassDecorator({
          httpClient: this.httpClient,
          wakJSC: this.wakJSC
        });

        for (let dcName in catalog) {
          dcDecorator.addJSCMethods(catalog[dcName]);

          //Adding dataClasses to map on WakJSC instance to make them accessible
          //accross whole module
          this.wakJSC._dataclassMap.set(dcName, catalog[dcName]);
        }

        return catalog;
      });
  }
}

export default Catalog;
