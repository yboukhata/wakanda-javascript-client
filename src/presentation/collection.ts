import Entity from './entity';
import {DataClass} from './dataclass';
import {QueryOption} from './query-option';

class Collection {

  public entities: Entity[];
  public _deferred: boolean;
  public _count: number;
  public _first: number;
  public _sent: number;
  public _pageSize: number;
  
  [key: string]: any;
  
  private _dataClass: DataClass;
  
  public fetch: (options?: QueryOption) => Promise<Collection>;
  public nextPage: () => Promise<Collection>;
  public prevPage: () => Promise<Collection>;
  public more: () => Promise<Collection>;
  
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
