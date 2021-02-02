import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector('.popup__image');
    this._imageCaption = this._popupElement.querySelector('.popup__image-caption');
  }

  open(link, caption) {
    this._imageElement.src = link;
    this._imageElement.alt = caption;
    this._imageCaption.textContent = caption;

    super.open();
  }
}

export default PopupWithImage;
