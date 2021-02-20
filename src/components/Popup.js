// горячие клавиши
const ESC = "Escape";

class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButtonElement = this._popupElement.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // закрытие попупа нажатием на Esc
  _handleEscClose(evt) {
    if (evt.key === ESC) {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.classList.add("popup_opened");
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.classList.remove("popup_opened");
  }

  setEventListeners() {
    this._closeButtonElement.addEventListener('click', this.close.bind(this));
    this._popupElement.addEventListener('click', this._handleOverlayClose.bind(this));
  }
}

export default Popup;
