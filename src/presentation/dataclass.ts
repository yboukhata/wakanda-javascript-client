export class DataClass {
  
  public name: string;
  public collectionName: string;
  public attributes: Attribute[];
  public methods: any[];
  
  constructor({name, collectionName, attributes, methods}:
    {name: string, collectionName: string, attributes: Attribute[], methods: any[]}) {
      
    this.name = name;
    this.collectionName = collectionName;
    this.attributes = attributes;
    this.methods = methods;
  }
}

export class Attribute {
  
  public name: string;
  public type: string;
  public readOnly: boolean;
  public kind: string;
  
  constructor({name, type, readOnly, kind}:
   {name: string, type: string, readOnly: boolean, kind: string}) {
     
    this.name = name;
    this.type = type;
    this.readOnly = readOnly === true;
    this.kind = kind;
  }
}

export class AttributeRelated extends Attribute {

}

export class AttributeCollection extends Attribute {
  
  public entityType: string;
  
  constructor({name, type, readOnly, kind}:
    {name: string, type: string, readOnly: boolean, kind: string}) {
      
    super({name, type, readOnly, kind});
    this.entityType = type.substring(0, type.length - 10);
  }
}
