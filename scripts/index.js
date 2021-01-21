import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// блок карточек
const cardsContainer = document.querySelector(".cards");

// блок переменных профиля
const popupProfile = document.querySelector(".popup_type_profile");
const popupProfileCloseButton = popupProfile.querySelector(
  ".popup__close-button"
);
const popupProfileName = popupProfile.querySelector(".popup__input_type_name");
const popupProfileAbout = popupProfile.querySelector(
  ".popup__input_type_about"
);
const popupProfileForm = popupProfile.querySelector(".popup__form");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

// блок переменных добавления места
const popupMesto = document.querySelector(".popup_type_mesto");
const popupMestoCloseButton = popupMesto.querySelector(".popup__close-button");
const popupMestoForm = popupMesto.querySelector(".popup__form");
const popupMestoName = popupMesto.querySelector(".popup__input_type_name");
const popupMestoLink = popupMesto.querySelector(".popup__input_type_path");
const mestoAddButton = document.querySelector(".profile__add-button");

// блок переменных всплывающей фотографии
const popupImage = document.querySelector(".popup_type_image");
const popupImageCloseButton = popupImage.querySelector(".popup__close-button");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__image-caption");

// нажатие клавиши на документе
function handleDocumentEscapeDown(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

// открытие попапов
function openPopup(popup) {
  document.addEventListener("keydown", handleDocumentEscapeDown);
  popup.classList.add("popup_opened");
}

// закрытие попапов
function closePopup(popup) {
  document.removeEventListener("keydown", handleDocumentEscapeDown);
  popup.classList.remove("popup_opened");
}

// отправка формы редактирования профиля
function handleProfileFormSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = popupProfileName.value;
  profileSubtitle.textContent = popupProfileAbout.value;

  closePopup(popupProfile);
}

// отправка формы добавления места
function handleMestoFormSubmit(event) {
  event.preventDefault();

  const item = {
    popupImage: popupImage,
    popupImageElement: popupImageElement,
    popupImageCaption: popupImageCaption,
    popupOpenFunction: openPopup,
    name: popupMestoName.value,
    link: popupMestoLink.value,
  };
  const cardInstance = new Card(item, ".cards__template");
  const cardElement = cardInstance.generateCard();

  cardsContainer.prepend(cardElement);
  closePopup(popupMesto);
}

// открытие профиля
profileEditButton.addEventListener("click", () => {
  popupProfileForm.reset();

  popupProfileName.value = profileTitle.textContent;
  popupProfileAbout.value = profileSubtitle.textContent;

  openPopup(popupProfile);
});

// закрытие профиля
popupProfileCloseButton.addEventListener("click", () => {
  closePopup(popupProfile);
});

// открытие места
mestoAddButton.addEventListener("click", () => {
  popupMestoForm.reset();
  openPopup(popupMesto);
});

// закрытие места
popupMestoCloseButton.addEventListener("click", () => {
  closePopup(popupMesto);
});

// отправка форм
popupProfileForm.addEventListener("submit", handleProfileFormSubmit);
popupMestoForm.addEventListener("submit", handleMestoFormSubmit);

// закрытие картинки
popupImageCloseButton.addEventListener("click", () => closePopup(popupImage));

// закрытие попупа кликом на оверлей
function closePopupByOverlay(popupElement, evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(popupElement);
  }
}

// закрытие профиля кликом на оверлей
popupProfile.addEventListener("click", function (evt) {
  closePopupByOverlay(popupProfile, evt);
});

// закрытие места кликом на оверлей
popupMesto.addEventListener("click", function (evt) {
  closePopupByOverlay(popupMesto, evt);
});

// закрытие картинки кликом на оверлей
popupImage.addEventListener("click", function (evt) {
  closePopupByOverlay(popupImage, evt);
});

// создание карточек и вывод в DOM
initialCards.forEach((item) => {
  item.popupImage = popupImage;
  item.popupImageElement = popupImageElement;
  item.popupImageCaption = popupImageCaption;
  item.popupOpenFunction = openPopup;

  const cardInstance = new Card(item, ".cards__template");
  const cardElement = cardInstance.generateCard();

  cardsContainer.append(cardElement);
});

// создание валидаторов для каждой формы
const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((form) => {
  const validateInstance = new FormValidator(
    {
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__save-button",
      inactiveButtonClass: "popup__save-button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    },
    form
  );
  validateInstance.enableValidation();
});
