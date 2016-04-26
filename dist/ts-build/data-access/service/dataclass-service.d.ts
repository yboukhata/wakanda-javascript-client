import AbstractService from './abstract-service';
import { QueryOption } from '../../presentation/query-option';
import { EntityDBO } from '../../business/entity-business';
import { CollectionDBO } from '../../business/collection-business';
declare class DataClassService extends AbstractService {
    private dataClass;
    constructor({wakJSC, dataClass}: {
        wakJSC: any;
        dataClass: any;
    });
    find(id: string | number, options: QueryOption): Promise<EntityDBO>;
    query(options: QueryOption): Promise<CollectionDBO>;
    callMethod(methodName: string, parameters: any[]): Promise<any>;
}
export default DataClassService;
