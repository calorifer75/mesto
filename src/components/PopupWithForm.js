import Popup from "./Popup.js";

// пользовательские события
const onPopupClose = new CustomEvent("popup-close");

class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));
    this._buttonElement = this._popupElement.querySelector(".popup__save-button");
  }

  _getInputValues() {
    const inputValues = {};

    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  open(userInfo = undefined) {
    if (userInfo) {
      this._form['profile-name'].value = userInfo.name;
      this._form['profile-about'].value = userInfo.about;
    }

    super.open();
  }

  close() {
    this._form.reset();
    this._form.dispatchEvent(onPopupClose);

    super.close();
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitCallback(this._getInputValues(), this._buttonElement);
    });

    super.setEventListeners();
  }
}

export default PopupWithForm;
