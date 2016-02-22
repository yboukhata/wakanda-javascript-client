import AbstractService from './abstract-service';

class DirectoryService extends AbstractService {

  login(username, password, duration) {
    return this.httpClient.post({
      uri: '/$directory/login',
      data: [username, password, duration]
    }).then(() => {
        return true;
      });
  }

  logout() {
    return this.httpClient.get({
      uri: '/$directory/logout'
    }).then(res => {
      let obj = JSON.parse(res.body);
      if (obj.result && obj.result === true) {
        return true;
      }
      else {
        return Promise.reject();
      }
    });
  }

  currentUser() {
    return this.httpClient.get({
      uri: '/$directory/currentUser'
    })
      .then(res => {
        let obj = JSON.parse(res.body);

        if (obj.result && obj.result.ID) {
          return obj.result;
        }
        else {
          return Promise.reject();
        }
      });
  }

  currentUserBelongsTo(group) {
    return this.httpClient.post({
      uri: '/$directory/currentUserBelongsTo',
      data: [group]
    }).then(res => {
      let obj = JSON.parse(res.body);

      if (obj && obj.result && obj.result === true) {
        return true;
      }
      else {
        return Promise.reject();
      }
    });
  }
}

export default DirectoryService;
