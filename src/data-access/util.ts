import {QueryOption} from '../presentation/query-option';

class Util {
  static handleOptions(options: QueryOption) {

    if (!options) {
      return '';
    }

    let {
      select,
      filter,
      params,
      pageSize,
      start,
      orderBy,
      method
    } = options;

    var ret = '?';

    if (select) {
      ret += '&$expand=' + select;
    }

    if (filter) {
      ret += '&$filter=\"' + filter + '\"';
    }

    if (orderBy) {
      ret += '&$orderby=' + orderBy;
    }

    if (params) {
      if (!Array.isArray(params)) {
        throw new Error('params option must be an array');
      }

      if (params.length > 0) {
        var p = '[';

        for (let elt of params) {
          if (typeof elt === 'string') {
            p += '\"' + elt + '\",'
          }
          else {
            p += elt + ',';
          }
        }

        p   = p.slice(0, -1);
        p   += ']';
        ret += '&$params=\'' + p + '\'';
      }
    }

    if (pageSize) {
      if (!this.isInteger(pageSize)) {
        throw new Error('pageSize option must be an integer');
      }

      ret += '&$limit=' + pageSize;
    }

    if (start) {
      if (!this.isInteger(start)) {
        throw new Error('start option must be an integer');
      }

      ret += '&$skip=' + start;
    }

    if (method) {
      ret += '&$method=' + method
    }

    if (ret.length > 1 && ret[1] === '&') {
      ret = ret.replace('?&', '?');
    }

    return ret === '?' ? '' : ret;
  }

  static isInteger(n: any): boolean {
    return typeof n === 'number' && !isNaN(n) && (n % 1) === 0;
  }

  static removeRestInfoFromEntity(entity: any): void {
    for (let prop in entity) {
      if (Object.prototype.hasOwnProperty.call(entity, prop)) {
        let p = entity[prop];
        if (p && p.__deferred && p.__deferred.__KEY) { //Do not remove uri for collection
          delete p.__deferred.uri;
        }
      }
    }
  }
}

export default Util;
