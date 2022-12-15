export class UserInfo {
  constructor(userSelectors, userData) {
    this._name = document.querySelector(userSelectors.name);
    this._about = document.querySelector(userSelectors.about);
    this._avatar = document.querySelector(userSelectors.avatar);
    this._user = userData;
  }

  getUserInfo () {
    return this._user;
  }

  getUserId() {
    return this._user._id;
  }

  setUserInfo (user) {
    if (user.name || user.about) {
      this._user.name = user.name;
      this._user.about = user.about;
      this._name.textContent = user.name;
      this._about.textContent = user.about;
    }
  }

  setUserAvatar(user) {
    if(user.avatar) {
      this._avatar.src = user.avatar;
    }
  }
}