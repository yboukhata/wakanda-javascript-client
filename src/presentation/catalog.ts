class Catalog {
  constructor({dataClasses}) {
    for (let dc of dataClasses) {
      this[dc.name] = dc;
    }
  }
}

export default Catalog;
