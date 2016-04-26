import AbstractBusiness from './abstract-business';
export interface CurrentUserDBO {
    userName: string;
    fullName: string;
    ID: string | number;
}
declare class DirectoryBusiness extends AbstractBusiness {
    private service;
    constructor({wakJSC}: {
        wakJSC: any;
    });
    login(username: string, password: string, duration?: number): Promise<boolean>;
    logout(): Promise<boolean>;
    currentUser(): Promise<CurrentUserDBO>;
    currentUserBelongsTo(group: string): Promise<boolean>;
}
export default DirectoryBusiness;
