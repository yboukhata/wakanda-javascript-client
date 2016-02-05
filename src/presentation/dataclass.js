class DataClass {
  constructor({name, collectionName, attributes}) {
    this.name = name;
    this.collectionName = collectionName;
    this.attributes = attributes;
  }
}

class Attribute {
  constructor({name, type, readOnly, kind}) {
    this.name = name;
    this.type = type;
    this.readOnly = readOnly === true;
    this.kind = kind;
  }
}

class AttributeRelated extends Attribute {

}

class AttributeCollection extends Attribute {
  constructor({name, type, readOnly, kind}) {
    super({name, type, readOnly, kind});
    this.entityType = type.substring(0, type.length - 10);
  }
}

export {DataClass, Attribute, AttributeRelated, AttributeCollection};
