class Card {
  constructor(data, tempateSelector, openPopupImageCallback) {
    this._element = document
      .querySelector(tempateSelector)
      .content.cloneNode(true);
    this._photoElement = this._element.querySelector(".cards__photo");
    this._likeCountElement = this._element.querySelector(".cards__like-count");
    this._name = data.name;
    this._link = data.link;
    this._likeCount = data.likes.length;

    this._photoElement.addEventListener("click", () => {
      openPopupImageCallback(this._link, this._name);
    });
  }

  // переключение лайков
  _toggleLike(evt) {
    evt.target.classList.toggle("cards__like_liked");
  }

  // удаление карточки
  _deleteCard(evt) {
    evt.target.closest(".cards__card").remove();
  }

  // привязка обработчиков событий
  _setEventListeners() {
    this._element
      .querySelector(".cards__like")
      .addEventListener("click", (evt) => {
        this._toggleLike(evt);
      });

    this._element
      .querySelector(".cards__trash")
      .addEventListener("click", (evt) => {
        this._deleteCard(evt);
      });
  }

  // генерация и возврат карточки
  generateCard() {
    this._setEventListeners();

    this._element.querySelector(".cards__title").textContent = this._name;
    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;
    this._likeCountElement.textContent = this._likeCount;
    return this._element;
  }
}

export default Card;
