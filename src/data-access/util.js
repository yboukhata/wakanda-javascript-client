class Util {
  static handleOptions(options) {

    if (!options) {
      return '';
    }

    let {select} = options;
    var ret = '?';

    if (select) {
      ret += '$expand=' + select;
    }

    if (ret.length > 1 && ret[1] === '&') {
      ret = ret.replace('?&', '?');
    }

    return ret === '?' ? '' : ret;
  }
}

export default Util;
