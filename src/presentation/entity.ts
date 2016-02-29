import {DataClass} from './dataclass';

class Entity {
  
  public _key: string;
  public _stamp: number;
  public _deferred: boolean;
  public _dataClass: DataClass;
  
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
