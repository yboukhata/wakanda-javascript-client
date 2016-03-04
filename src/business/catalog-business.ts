import AbstractBusiness from './abstract-business';
import CatalogService from '../data-access/service/catalog-service';
import Catalog from '../presentation/catalog';
import {DataClass, Attribute, AttributeRelated, AttributeCollection} from '../presentation/dataclass';
import DataClassBusiness from './dataclass-business';

export interface DataClassDBO {
  name: string;
  collectionName: string;
  attributes: {
    name: string,
    type: string,
    kind: string,
    readOnly: boolean
  }[];
  methods: {
    name: string,
    applyTo: string
  }[];
}

class CatalogBusiness extends AbstractBusiness {
  
  private service: CatalogService;
  
  constructor(obj: any) {
    super(obj);

    this.service = new CatalogService({
      wakJSC: this.wakJSC
    });
  }

  get(dataClasses?: string[]): Promise<Catalog> {
    return this.service.get(dataClasses).then((dataClassDBOArray: DataClassDBO[]) => {

      let dcArray: DataClass[] = [];

      for (let dcDBO of dataClassDBOArray) {
        let attributes: Attribute[] = [];

        for(let attr of dcDBO.attributes) {
          switch (attr.kind) {
            case 'relatedEntity':
              attributes.push(new AttributeRelated({
                name: attr.name,
                type: attr.type,
                kind: attr.kind
              }));
              break;
            case 'storage':
            case 'calculated':
            case 'alias':
              let readOnly = attr.readOnly || (attr.type === 'image' || attr.type === 'blob');
              attributes.push(new Attribute({
                name: attr.name,
                type: attr.type,
                readOnly,
                kind: attr.kind
              }));
              break;
            case 'relatedEntities':
              attributes.push(new AttributeCollection({
                name: attr.name,
                type: attr.type,
                kind: attr.kind
              }));
              break;
            default:
              throw new Error('[WakJSC] Unhandled ' + attr.kind + ' attribute type');
          }
        }

        let methods: {
          entity: string[],
          collection: string[],
          dataClass: string[]
        } = {
          entity: [],
          collection: [],
          dataClass: []
        };

        for (let method of dcDBO.methods) {
          switch(method.applyTo) {
            case 'entity':
              methods.entity.push(method.name);
              break;
            case 'entityCollection':
              methods.collection.push(method.name);
              break;
            case 'dataClass':
              methods.dataClass.push(method.name);
              break;
            default:
              throw new Error('Unrecognized method type');
          }
        }

        let dataClass = new DataClass({
          name: dcDBO.name,
          collectionName: dcDBO.collectionName,
          attributes,
          methods
        });

        //Binding framework methods to the dataclass
        let dataClassBusiness = new DataClassBusiness({
          wakJSC: this.wakJSC,
          dataClass,
          methods
        });
        dataClassBusiness._decorateDataClass();

        dcArray.push(dataClass);
      }

      return new Catalog({
        dataClasses: dcArray
      });
    });
  }
}

export default CatalogBusiness;
