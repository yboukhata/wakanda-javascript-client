import AbstractBusiness from './abstract-business';
import CatalogService from '../data-access/service/catalog-service';
import Catalog from '../presentation/catalog';
import {DataClass, Attribute, AttributeRelated, AttributeCollection} from '../presentation/dataclass';

class CatalogBusiness extends AbstractBusiness {
  constructor(obj) {
    super(obj);

    this.service = new CatalogService({
      wakJSC: this.wakJSC
    });
  }

  get(dataClasses) {
    return this.service.get(dataClasses).then(dataClassDBOArray => {

      let dcArray = [];

      for (let dcDBO of dataClassDBOArray) {
        let attributes = [];

        for(let attr of dcDBO.attributes) {
          switch (attr.kind) {
            case 'relatedEntity':
              attributes.push(new AttributeRelated({
                name: attr.name,
                type: attr.type
              }));
              break;
            case 'storage':
            case 'calculated':
            case 'alias':
              attributes.push(new Attribute({
                name: attr.name,
                type: attr.type,
                readOnly: attr.readOnly
              }));
              break;
            case 'relatedEntities':
              attributes.push(new AttributeCollection({
                name: attr.name,
                type: attr.type
              }));
              break;
            default:
              throw new Error('[WakJSC] Unhandled ' + attr.kind + ' attribute type');
          }
        }

        dcArray.push(new DataClass({
          name: dcDBO.name,
          collectionName: dcDBO.name,
          attributes
        }));
      }

      return new Catalog({
        dataClasses: dcArray
      });
    });
  }
}

export default CatalogBusiness;
