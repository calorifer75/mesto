import { myOwnerId } from "../utils/constants.js";

class Card {
  constructor(
    data,
    tempateSelector,
    openPopupImageCallback,
    openPopupDeleteCallback,
    toggleLikeCallback
  ) {
    this._element = document
      .querySelector(tempateSelector)
      .content.cloneNode(true);

    this._photoElement = this._element.querySelector(".cards__photo");
    this._trashElement = this._element.querySelector(".cards__trash");
    this._likeCountElement = this._element.querySelector(".cards__like-count");
    this._likeElement = this._element.querySelector(".cards__like");

    this._name = data.name;
    this._link = data.link;
    this._likeCount = data.likes.length;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;

    this._isMyLike = false;
    data.likes.forEach((like) => {
      if (like._id === myOwnerId) {
        this._isMyLike = true;
        return;
      }
    });

    this._photoElement.addEventListener("click", () => {
      openPopupImageCallback(this._link, this._name);
    });

    this._trashElement.addEventListener("click", (event) => {
      openPopupDeleteCallback(
        event.target.closest(".cards__card"),
        this._cardId
      );
    });

    this._likeElement.addEventListener("click", (event) => {
      toggleLikeCallback(this);
    });
  }

  // генерация и возврат карточки
  generateCard() {
    this._element.querySelector(".cards__title").textContent = this._name;
    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;
    this._likeCountElement.textContent = this._likeCount;

    // лайканутость
    if (this._isMyLike) {
      this._likeElement.classList.add("cards__like_liked");
    }

    // для чужих карточек корзина не появляется
    if (this._cardOwnerId !== myOwnerId) {
      this._trashElement.classList.add("cards__trash_hide");
    }

    return this._element;
  }
}

export default Card;
