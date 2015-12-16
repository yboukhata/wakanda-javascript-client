import DataClass from '../model/dataclass';

class CatalogTransform {
  constructor({rawString}) {
    let rawObj = JSON.parse(rawString);
    let dataClasses = [];

    for (let d of rawObj.dataClasses) {
      dataClasses.push(new DataClass({rawObj: d}));
    }

    return dataClasses;
  }
}

export default CatalogTransform;
