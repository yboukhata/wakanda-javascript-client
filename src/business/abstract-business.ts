import WakJSC from '../wakjsc';

abstract class AbstractBusiness {
  
  public wakJSC: WakJSC;
  
  constructor({wakJSC}: {wakJSC: WakJSC}) {
    this.wakJSC = wakJSC;
  }
}

export default AbstractBusiness;
