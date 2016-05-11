import {DataClass} from './dataclass';

class Catalog {

  [key: string]: DataClass;

  constructor({dataClasses}) {
    for (let dc of dataClasses) {
      this[dc.name] = dc;
    }
  }
}

export default Catalog;
