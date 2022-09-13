export class UserInfo {
  constructor(userSelector) {
    this._name = document.querySelector(userSelector.name);
    this._description = document.querySelector(userSelector.description);
  }

  getUserInfo () {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }

  setUserInfo (user) {
      this._name.textContent = user.name;
      this._description.textContent = user.description;
  }
}