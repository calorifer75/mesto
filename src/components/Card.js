import { myOwnerId } from "../utils/constants.js";

class Card {
  constructor(
    data,
    tempateSelector,
    openPopupImageCallback,
    openPopupDeleteCallback
  ) {
    this._element = document
      .querySelector(tempateSelector)
      .content.cloneNode(true);
    this._photoElement = this._element.querySelector(".cards__photo");
    this._trashElement = this._element.querySelector(".cards__trash");
    this._likeCountElement = this._element.querySelector(".cards__like-count");
    this._deleteElement = this._element.querySelector(".cards__trash");
    this._name = data.name;
    this._link = data.link;
    this._likeCount = data.likes.length;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;

    this._photoElement.addEventListener("click", () => {
      openPopupImageCallback(this._link, this._name);
    });

    this._deleteElement.addEventListener("click", (event) => {
      openPopupDeleteCallback(
        event.target.closest(".cards__card"),
        this._cardId
      );
    });
  }

  // переключение лайков
  _toggleLike(evt) {
    evt.target.classList.toggle("cards__like_liked");
  }

  // привязка обработчиков событий
  _setEventListeners() {
    this._element
      .querySelector(".cards__like")
      .addEventListener("click", (evt) => {
        this._toggleLike(evt);
      });
  }

  // генерация и возврат карточки
  generateCard() {
    this._setEventListeners();

    this._element.querySelector(".cards__title").textContent = this._name;
    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;
    this._likeCountElement.textContent = this._likeCount;

    // для чужих карточек корзина не появляется
    if (this._cardOwnerId !== myOwnerId) {
      this._trashElement.classList.add('cards__trash_hide');
    }

    return this._element;
  }
}

export default Card;
