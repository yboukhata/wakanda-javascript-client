import AbstractService from './abstract-service';
import DataClassDBO from '../../business/dbo/dataclass-dbo';

class CatalogService extends AbstractService {
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
        let catalog = [];
        let rawObj = JSON.parse(res.body);

        for (let d of rawObj.dataClasses) {

          let attributes = [];
          for (let attr of d.attributes) {
            attributes.push({
              name: attr.name,
              kind: attr.kind,
              type: attr.type,
              readOnly: attr.readOnly
            });
          }

          catalog.push(new DataClassDBO({
            name: d.name,
            collectionName: d.collectionName,
            attributes
          }));
        }

        return catalog;
      });
  }
}

export default CatalogService;
