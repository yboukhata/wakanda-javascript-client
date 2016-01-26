import AbstractBusiness from './abstract-business';
import DirectoryService from '../data-access/service/directory-service';
import Const from '../const';

class DirectoryBusiness extends AbstractBusiness {
  constructor({wakJSC}) {
    super({wakJSC});

    this.service = new DirectoryService({wakJSC});
  }

  login(username, password, duration) {

    let durationTime = duration || Const.DEFAULT_SESSION_DURATION;

    if (!(typeof durationTime === 'number') || durationTime <= 0) {
      throw new Error('Directory.login: invalid duration parameter');
    }

    return this.service.login(username, password, durationTime)
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
