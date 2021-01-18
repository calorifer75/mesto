class Card {
  constructor(data, tempateSelector) {
    this._popupImage = data.popupImage;
    this._popupImageElement = data.popupImageElement;
    this._popupImageCaption = data.popupImageCaption;
    this._popupOpenFunction = data.popupOpenFunction;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = tempateSelector;
  }

  // получение разметки
  _getTemplate(templateSelector) {
    return document.querySelector(templateSelector).content.cloneNode(true);
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

    this._photoElement.addEventListener("click", () => {
      this._popupImageElement.src = this._link;
      this._popupImageElement.alt = this._name;
      this._popupImageCaption.textContent = this._name;
      this._popupOpenFunction(this._popupImage);
    });
  }

  // генерация и возврат карточки
  generateCard() {
    this._element = this._getTemplate(this._templateSelector);
    this._photoElement = this._element.querySelector(".cards__photo");

    this._setEventListeners();

    this._element.querySelector(".cards__title").textContent = this._name;
    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;

    return this._element;
  }
}

export default Card;
