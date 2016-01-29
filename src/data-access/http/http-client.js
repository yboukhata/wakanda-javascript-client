class HttpClient {

  constructor({apiPrefix}) {
    this.prefix = apiPrefix;

    this._getRequestInterceptors = [];
    this._postRequestInterceptors = [];
  }

  get(options) {
    for (let i = 0; i < this._getRequestInterceptors.length; i++) {
      let interceptor = this._getRequestInterceptors[i];
      let res = interceptor(options);

      if (res !== null && (typeof res !== 'undefined')) {
        return res;
      }
    }

    return null;
  }

  post(options) {
    for (let i = 0; i < this._postRequestInterceptors.length; i++) {
      let interceptor = this._postRequestInterceptors[i];
      let res = interceptor(options);

      if (res !== null && (typeof res !== 'undefined')) {
        return res;
      }
    }

    return null;
  }

  /**
   * @param {array|string} type - HTTP verb of the request to intercept
   * @param {function} callback - The interceptor function to execute before HTTP request. If it returns something different than null, the underlying HTTP request won't be executed
   * @returns {null|object} Returns null or an object, if an object is returned, the underlying HTTP request won't be executed
   */
  registerRequestInterceptor(type, callback) {

    let interceptorType = this._interceptorTypeToArray(type);

    interceptorType.forEach(t => {
      if (t === 'get') {
        this._getRequestInterceptors.push(callback);
      }
      else if(t === 'post') {
        this._postRequestInterceptors.push(callback);
      }
    });
  }

  _interceptorTypeToArray(type) {
    let interceptorType = [];

    if (typeof type === 'string') {
      if (!this._isValidInterceptorType(type.toLowerCase())) {
        throw new Error('HttpClient.registerInterceptor: invalid interceptor type');
      }
      else {
        interceptorType.push(type.toLowerCase());
      }
    }
    else if (Array.isArray(type)) {
      type.forEach(t => {
        if (!this._isValidInterceptorType(t.toLowerCase())) {
          throw new Error('HttpClient.registerInterceptor: invalid interceptor type');
        }
        else {
          interceptorType.push(t.toLowerCase());
        }
      });
    }
    else {
      throw new Error('HttpClient.registerInterceptor: type must be a string or an array');
    }

    return interceptorType;
  }

  _isValidInterceptorType(type) {
    let validTypes = ['get', 'post'];

    return validTypes.indexOf(type) !== -1;
  }
}

export default HttpClient;
