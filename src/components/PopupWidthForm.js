import Popup from "./Popup.js";

// пользовательские события
const onPopupClose = new CustomEvent("popup-close");

class PopupWidthForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popupElement.querySelector(".popup__form");
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));
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
      this._form['profile-name'].value = userInfo.userName;
      this._form['profile-about'].value = userInfo.userAbout;
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
      this._formSubmitCallback(this._getInputValues());
    });

    super.setEventListeners();
  }
}

export default PopupWidthForm;
