import DataClass from '../model/dataclass';

class CatalogTransform {
  constructor({rawString}) {
    let rawObj = JSON.parse(rawString);
    let catalog = {};

    for (let d of rawObj.dataClasses) {
      catalog[d.name] = new DataClass({rawObj: d});
    }

    return catalog;
  }
}

export default CatalogTransform;
