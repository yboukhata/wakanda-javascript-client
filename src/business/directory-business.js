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

  currentUserBelongsTo(group) {

    if (!(typeof group === 'string')) {
      throw new Error('Directory.currentUserBelongsTo: group must be a string');
    }

    return this.service.currentUserBelongsTo(group)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}

export default DirectoryBusiness;
