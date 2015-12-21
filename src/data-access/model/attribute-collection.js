import Attribute from './attribute';

class AttributeCollection extends Attribute {

  constructor({name, type, readOnly}) {
    super({name, type, readOnly});
    this.entityType = type.substring(0, type.length - 10);
  }
}

export default AttributeCollection;
