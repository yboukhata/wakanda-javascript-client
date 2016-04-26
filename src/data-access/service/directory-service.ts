import AbstractService from './abstract-service';
import {CurrentUserDBO} from '../../business/directory-business';
import {DirectoryBaseService} from './base/directory-base-service';

class DirectoryService extends AbstractService {

  login(username: string, password: string, duration: number): Promise<boolean> {
    return DirectoryBaseService.login({
      httpClient: this.httpClient,
      username,
      password,
      duration
    });
  }

  logout(): Promise<boolean> {
    return DirectoryBaseService.logout({
      httpClient: this.httpClient
    });
  }

  currentUser(): Promise<CurrentUserDBO> {
    return DirectoryBaseService.currentUser({
      httpClient: this.httpClient
    });
  }

  currentUserBelongsTo(group: string): Promise<boolean> {
    return DirectoryBaseService.currentUserBelongsTo({
      httpClient: this.httpClient,
      group
    });
  }
}

export default DirectoryService;
