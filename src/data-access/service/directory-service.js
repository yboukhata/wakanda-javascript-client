import AbstractService from './abstract-service';

class DirectoryService extends AbstractService {

  login(username, password) {
    return this.httpClient.post({
      uri: '/$directory/login',
      data: [username, password]
    })
      .then(_ => {
        return true;
      })
      .catch(_ => {
        throw new Error('Directory.login: Unauthorized');
      });
  }
}

export default DirectoryService;
