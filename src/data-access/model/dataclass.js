import Attribute from './attribute';
import AttributeRelated from './attribute-related';
import AttributeCollection from './attribute-collection';

class DataClass {
  constructor({rawObj}) {
    this.name = rawObj.name;
    this.collectionName = rawObj.collectionName;
    this.attributes = [];

    this._processAttributes(rawObj.attributes);
  }

  _processAttributes(attributes) {
    for(let attr of attributes) {
      switch (attr.kind) {
        case 'relatedEntity':
          this.attributes.push(new AttributeRelated({
            name: attr.name,
            type: attr.type
          }));
          break;
        case 'storage':
        case 'calculated':
        case 'alias':
          this.attributes.push(new Attribute({
            name: attr.name,
            type: attr.type,
            readOnly: attr.readOnly
          }));
          break;
        case 'relatedEntities':
            this.attributes.push(new AttributeCollection({
              name: attr.name,
              type: attr.type
            }));
          break;
        default:
          throw new Error('[WakJSC] Unhandled ' + attr.kind + ' attribute type');
      }
    }
  }
}

export default DataClass;
