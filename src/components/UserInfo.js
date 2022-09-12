export class UserInfo {
  constructor(user) {
    this._name = document.querySelector(user.name);
    this._description = document.querySelector(user.description);
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