import AbstractBusiness from './abstract-business';
import DataClassService from '../data-access/service/dataclass-service';

class DataClassBusiness extends AbstractBusiness {
  constructor({wakJSC, dataClass}) {
    super({wakJSC});

    this.dataClass = dataClass;
    this.service = new DataClassService({
      wakJSC: this.wakJSC,
      dataClass
    });
  }

  find(id) {
    return this.service.find(id);
  }

  _decorateDataClass(dataClass) {
    //Do not forget to bind(this) to have "this" pointing on business object
    //instead of given dataclass object
    dataClass.find = this.find.bind(this);
  }
}

export default DataClassBusiness;
