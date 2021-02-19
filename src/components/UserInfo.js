class UserInfo {
  constructor(
    { nameSelector, aboutSelector, avatarSelector, changeAvatarSelector },
    openAvatarPopupCallback
  ) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._changeAvatarElement = document.querySelector(changeAvatarSelector);

    this._avatarElement.addEventListener("click", () => openAvatarPopupCallback());
    this._changeAvatarElement.addEventListener("click", () => openAvatarPopupCallback());
  }

  render({ name, about, avatar }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarElement.src = avatar;
  }
}

export default UserInfo;
