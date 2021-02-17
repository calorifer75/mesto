import Popup from "./Popup";

class PopupWithButton extends Popup {
  constructor(popupSelector, buttonClickCallback) {
    super(popupSelector);

    this._popupElement
      .querySelector(".popup__save-button")
      .addEventListener("click", () => {
        buttonClickCallback(this._cardElement, this._cardId);
      });
  }

  open(cardElement, cardId) {
    this._cardElement = cardElement;
    this._cardId = cardId;
    super.open();
  }
}

export default PopupWithButton;
