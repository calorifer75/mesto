class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _resetErrorState(buttonElement, inputList) {
    this._toggleButtonState(buttonElement, inputList);
    inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(buttonElement, inputList) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );

    // отключить отправку формы по умолчанию
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    // сбросить отображение ошибок при очистке формы
    this._formElement.addEventListener("reset", () => {
      this._resetErrorState(submitButton, inputList);
    });

    // проверить инпуты на ошибки
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(submitButton, inputList);
      });
    });

    // переключить состояние кнопки
    this._toggleButtonState(submitButton, inputList);
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;
