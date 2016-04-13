import AbstractService from './abstract-service';
import { QueryOption } from '../../presentation/query-option';
import { CollectionDBO } from '../../business/collection-business';
declare class CollectionService extends AbstractService {
    private collection;
    private dataClass;
    private collectionUri;
    private isEntitySet;
    constructor({wakJSC, collection, dataClass, collectionUri}: {
        wakJSC: any;
        collection: any;
        dataClass: any;
        collectionUri: any;
    });
    fetch(options: QueryOption): Promise<CollectionDBO>;
    callMethod(methodName: string, parameters: any[]): Promise<any>;
}
export default CollectionService;
