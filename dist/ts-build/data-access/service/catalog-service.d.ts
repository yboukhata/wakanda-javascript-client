import AbstractService from './abstract-service';
import { DataClassDBO } from '../../business/catalog-business';
declare class CatalogService extends AbstractService {
    get(dataClasses?: string | string[]): Promise<DataClassDBO[]>;
}
export default CatalogService;
