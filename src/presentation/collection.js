class Collection {
  constructor({deferred}) {
    this.entities = [];
    this._deferred = deferred === true;
  }
}
export default Collection;
