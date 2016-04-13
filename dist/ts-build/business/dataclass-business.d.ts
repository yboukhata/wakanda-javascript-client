import AbstractBusiness from './abstract-business';
import Entity from '../presentation/entity';
import Collection from '../presentation/collection';
import Media from '../presentation/media';
import { CollectionDBO } from './collection-business';
import { QueryOption } from '../presentation/query-option';
import { EntityDBO } from './entity-business';
declare class DataClassBusiness extends AbstractBusiness {
    private dataClass;
    methods: {
        entity: string[];
        collection: string[];
        dataClass: string[];
    };
    private service;
    _dataClassBusinessMap: Map<string, DataClassBusiness>;
    constructor({wakJSC, dataClass, methods}: {
        wakJSC: any;
        dataClass: any;
        methods: any;
    });
    _decorateDataClass(): void;
    _addUserDefinedMethods(): void;
    callMethod(methodName: string, parameters: any[]): Promise<Entity | Collection | any>;
    find(id: string | number, options?: QueryOption): Promise<Entity>;
    query(options?: QueryOption): Promise<Collection>;
    create(pojo?: any): Entity;
    _createEntity({key, deferred}: {
        key: string;
        deferred?: boolean;
    }): Entity;
    _createCollection({uri, deferred, pageSize, initialSelect}: {
        uri: string;
        deferred?: boolean;
        pageSize?: number;
        initialSelect?: string;
    }): Collection;
    _createMedia({uri, isImage, attributeName, entity}: {
        uri: string;
        isImage: boolean;
        attributeName: string;
        entity: Entity;
    }): Media;
    _presentationEntityFromDbo({dbo}: {
        dbo: EntityDBO;
    }): Entity;
    _presentationCollectionFromDbo({dbo, pageSize, initialSelect}: {
        dbo: CollectionDBO;
        pageSize?: number;
        initialSelect?: string;
    }): Collection;
}
export default DataClassBusiness;
