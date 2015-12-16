class Attribute {
  constructor({name, type, readOnly}) {
    this.name = name;
    this.type = type;
    this.readOnly = readOnly === true;
  }
}

export default Attribute;
