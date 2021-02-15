class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // getUserInfo() {
  //   return {
  //     userName: this._nameElement.textContent,
  //     userAbout: this._aboutElement.textContent,
  //   };
  // }

  // setUserInfo({ userName, userAbout }) {
  //   this._nameElement.textContent = userName;
  //   this._aboutElement.textContent = userAbout;
  // }

  render({ name, about, avatar }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarElement.src = avatar;
  }
}

export default UserInfo;
