class AbstractService {
  constructor({wakJSC}) {
    this.wakJSC = wakJSC;
    this.httpClient = wakJSC._httpClient;
  }
}

export default AbstractService;
