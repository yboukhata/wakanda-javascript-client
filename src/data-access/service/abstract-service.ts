import WakJSC from '../../wakjsc';
import HttpClient from '../http/http-client';

abstract class AbstractService {
  
  protected httpClient: HttpClient;
  protected wakJSC: WakJSC;
  
  constructor({wakJSC}: {wakJSC: WakJSC}) {
    this.wakJSC = wakJSC;
    this.httpClient = wakJSC._httpClient;
  }
}

export default AbstractService;
