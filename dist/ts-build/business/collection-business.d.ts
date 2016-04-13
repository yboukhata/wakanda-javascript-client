import AbstractBusiness from './abstract-business';
import { EntityDBO } from './entity-business';
import Collection from '../presentation/collection';
import { QueryOption } from '../presentation/query-option';
export interface CollectionDBO {
    __ENTITYSET: string;
    __COUNT: number;
    __FIRST: number;
    __SENT: number;
    __ENTITIES: EntityDBO[];
    __deferred: {
        uri: string;
    };
    [key: string]: any;
}
declare class CollectionBusiness extends AbstractBusiness {
    private collection;
    private dataClass;
    private dataClassBusiness;
    private service;
    private pageSize;
    private initialSelect;
    constructor({wakJSC, dataClass, collection, dataClassBusiness, collectionUri, pageSize, initialSelect}: {
        wakJSC: any;
        dataClass: any;
        collection: any;
        dataClassBusiness: any;
        collectionUri: any;
        pageSize: any;
        initialSelect: any;
    });
    _decorateCollection(): void;
    fetch(options?: QueryOption): Promise<Collection>;
    more(): Promise<Collection>;
    nextPage(): Promise<Collection>;
    prevPage(): Promise<Collection>;
    _addUserDefinedMethods(): void;
    callMethod(methodName: string, parameters: any[]): Promise<any>;
    _refreshCollection({fresherCollection}: {
        fresherCollection: any;
    }): void;
}
export default CollectionBusiness;
