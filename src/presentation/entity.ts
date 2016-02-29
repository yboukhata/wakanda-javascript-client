import {Promise} from 'es6-promise';

import {DataClass} from './dataclass';
import {QueryOption} from './query-option';

class Entity {
  
  public _key: string;
  public _stamp: number;
  public _deferred: boolean;
  public _dataClass: DataClass;
  
  [key: string]: any;
  
  public save: () => Promise<Entity>;
  public delete: () => Promise<void>;
  public fetch: (options?: QueryOption) => Promise<Entity>;
  
  constructor({key, deferred, dataClass}:
   {key: string, deferred: boolean, dataClass: DataClass}) {
     
    this._key = key;
    this._deferred = deferred === true;

    Object.defineProperty(this, '_dataClass', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: dataClass
    });
  }
}

export default Entity;
