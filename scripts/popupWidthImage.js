import Popup from "./Popup.js";

class popupWidthImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(link, caption) {
    const imageElement = this._popupElement.querySelector('.popup__image');
    imageElement.src = link;
    imageElement.alt = caption;

    this._popupElement.querySelector('.popup__image-caption').textContent = caption;

    super.open();
  }
}

export default popupWidthImage;
