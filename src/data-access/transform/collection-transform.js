import {Collection} from '../model/collection';

class CollectionTransform {
  constructor({rawString, dataClass, wakJSC}) {
    return new Collection({
      rawObj: JSON.parse(rawString),
      dataClass,
      wakJSC
    });
  }
}

export default CollectionTransform;
