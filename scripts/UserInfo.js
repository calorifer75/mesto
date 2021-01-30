class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      userName: this._nameElement.textContent,
      userAbout: this._aboutElement.textContent,
    };
  }

  setUserInfo({ userName, userAbout }) {
    this._nameElement.textContent = userName;
    this._aboutElement.textContent = userAbout;
  }
}

export default UserInfo;
