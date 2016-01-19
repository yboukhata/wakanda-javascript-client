import AbstractBusiness from './abstract-business';
import DirectoryService from '../data-access/service/directory-service';

class DirectoryBusiness extends AbstractBusiness {
  constructor({wakJSC}) {
    super({wakJSC});

    this.service = new DirectoryService({wakJSC});
  }

  login(username, password) {
    return this.service.login(username, password)
      .catch(() => {
        throw new Error('Directory.login: Unauthorized');
      });
  }

  logout() {
    return this.service.logout()
      .catch(() => {
        throw new Error('Directory.logout: logout failed');
      });
  }

  currentUser() {
    return this.service.currentUser()
      .then(dbo => {
        return dbo;
      })
      .catch(() => {
        throw new Error('Directory.currentUser: user is not logged in');
      });
  }
}

export default DirectoryBusiness;
