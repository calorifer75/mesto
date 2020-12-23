const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Убирает индикацию ошибок в переданном попупе
function resetErrors(popupElement, settings) {
  const formList = Array.from(
    popupElement.querySelectorAll(settings.formSelector)
  );

  formList.forEach(function (formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    const submitButton = formElement.querySelector(
      settings.submitButtonSelector
    );

    toggleButtonState(submitButton, inputList);

    inputList.forEach(function (inputElement) {
      hideInputError(inputElement, formElement, settings);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(buttonElement, inputList) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

function showInputError(inputElement, formElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(settings.inputErrorClass);
  errorElement.classList.add(settings.errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(inputElement, formElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(inputElement, formElement, settings) {
  if (inputElement.validity.valid) {
    hideInputError(inputElement, formElement, settings);
  } else {
    showInputError(
      inputElement,
      formElement,
      inputElement.validationMessage,
      settings
    );
  }
}

function setEventListeners(formElement, settings) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );

  const submitButton = formElement.querySelector(
    settings.submitButtonSelector
  );

  toggleButtonState(submitButton, inputList);

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      checkInputValidity(inputElement, formElement, settings);
      toggleButtonState(submitButton, inputList);
    });
  });
}

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach(function (formElement) {
    // отключить отправку формы по умолчанию
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, settings);
  });
}

enableValidation(settings);
