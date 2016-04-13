import AbstractService from './abstract-service';
import { CurrentUserDBO } from '../../business/directory-business';
declare class DirectoryService extends AbstractService {
    login(username: string, password: string, duration: number): Promise<boolean>;
    logout(): Promise<boolean>;
    currentUser(): Promise<CurrentUserDBO>;
    currentUserBelongsTo(group: string): Promise<boolean>;
}
export default DirectoryService;
