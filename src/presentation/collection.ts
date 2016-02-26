import {Promise} from 'es6-promise';

import Entity from './entity';
import {DataClass} from './dataclass';

class Collection {

  public entities: Entity[];
  public _deferred: boolean;
  public _count: number;
  public _first: number;
  public _sent: number;
  public _pageSize: number;
  
  private _dataClass: DataClass;
  
  constructor({deferred, dataClass}) {
    this.entities = [];
    this._deferred = deferred === true;

    Object.defineProperty(this, '_dataClass', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: dataClass
    });
  }
}
export default Collection;
