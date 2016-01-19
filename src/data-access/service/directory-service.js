import AbstractService from './abstract-service';

class DirectoryService extends AbstractService {

  login(username, password) {
    return this.httpClient.post({
      uri: '/$directory/login',
      data: [username, password]
    }).then(() => {
        return true;
      });
  }

  logout() {
    return this.httpClient.get({
      uri: '/$directory/logout'
    }).then(res => {
      let obj = JSON.parse(res.body);
      if (obj.result) {
        if (obj.result === true) {
          return true;
        }
      }

      return Promise.reject();
    });
  }
}

export default DirectoryService;
