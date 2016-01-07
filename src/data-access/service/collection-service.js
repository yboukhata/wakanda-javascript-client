import AbstractService from './abstract-service';
import Util from '../util';

class CollectionService extends AbstractService {
  constructor({wakJSC, collection, dataClass}) {
    super({wakJSC});

    this.collection = collection;
    this.dataClass = dataClass;
  }
}

export default CollectionService;
