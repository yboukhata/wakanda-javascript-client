class CatalogTransform {
  constructor({rawString}) {
    let rawObj = JSON.parse(rawString);

    for (let d of rawObj.dataClasses) {
      delete d.dataURI;
    }

    return rawObj;
  }
}

export default CatalogTransform;
