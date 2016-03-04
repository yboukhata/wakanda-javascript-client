import AbstractService from './abstract-service';
import {CurrentUserDBO} from '../../business/directory-business';

class DirectoryService extends AbstractService {

  login(username: string, password: string, duration: number): Promise<boolean> {
    
    return this.httpClient.post({
      uri: '/$directory/login',
      data: [username, password, duration]
    }).then(() => {
        return true;
      });
  }

  logout(): Promise<boolean> {
    return this.httpClient.get({
      uri: '/$directory/logout'
    }).then(res => {
      let obj = JSON.parse(res.body);
      if (obj.result && obj.result === true) {
        return true;
      }
      else {
        return <any>Promise.reject(new Error());
      }
    });
  }

  currentUser(): Promise<CurrentUserDBO> {
    return this.httpClient.get({
      uri: '/$directory/currentUser'
    })
      .then(res => {
        let obj = JSON.parse(res.body);

        if (obj.result && obj.result.ID) {
          return obj.result;
        }
        else {
          return Promise.reject(new Error());
        }
      });
  }

  currentUserBelongsTo(group: string): Promise<boolean> {
    return this.httpClient.post({
      uri: '/$directory/currentUserBelongsTo',
      data: [group]
    }).then(res => {
      let obj = JSON.parse(res.body);

      if (obj && obj.result && obj.result === true) {
        return true;
      }
      else {
        return <any>Promise.reject(new Error());
      }
    });
  }
}

export default DirectoryService;
