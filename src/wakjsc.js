import HttpClient from './http/http-client';

class WakJSC {
  constructor() {
  }

  getCatalog() {
    let client = new HttpClient();
    client.getCatalog();
  }

  version() {
    return '0.0.1';
  }
}

export default WakJSC;
