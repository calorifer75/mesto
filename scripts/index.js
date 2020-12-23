// блок карточек
const cardsContainer = document.querySelector(".cards");
const cardTemplateElement = document.querySelector(".cards__template").content;

// блок переменных профиля
const popupProfile = document.querySelector(".popup_type_profile");
const popupProfileCloseButton = popupProfile.querySelector(
  ".popup__close-button"
);
const popupProfileSaveButton = document.querySelector(
  ".popup__save-button_type_profile"
);
const popupProfileName = popupProfile.querySelector(".popup__input_type_name");
const popupProfileAbout = popupProfile.querySelector(
  ".popup__input_type_about"
);
const popupProfileForm = popupProfile.querySelector(".popup__form");
const popupProfileErrorList = Array.from(
  popupProfile.querySelectorAll(".popup__error")
);
const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

// блок переменных добавления места
const popupMesto = document.querySelector(".popup_type_mesto");
const popupMestoCloseButton = popupMesto.querySelector(".popup__close-button");
const popupMestoName = popupMesto.querySelector(".popup__input_type_name");
const popupMestoPath = popupMesto.querySelector(".popup__input_type_path");
const popupMestoForm = popupMesto.querySelector(".popup__form");
const mestoAddButton = document.querySelector(".profile__add-button");

// блок переменных всплывающей фотографии
const popupImage = document.querySelector(".popup_type_image");
const popupImageCloseButton = popupImage.querySelector(".popup__close-button");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__image-caption");

// нажатие клавиши на документе
function handleDocumentEscapeDown(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
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

// переключение лайков
function toggleLike(evt) {
  evt.target.classList.toggle("cards__like_liked");
}

// Удаление карточки
function deleteCard(evt) {
  evt.target.closest(".cards__card").remove();
}

// создание новой карточки
function makeCard(item) {
  const newCardElement = cardTemplateElement.cloneNode(true);
  const photoElement = newCardElement.querySelector(".cards__photo");

  newCardElement.querySelector(".cards__title").textContent = item.name;

  photoElement.src = item.link;
  photoElement.alt = item.name;

  photoElement.addEventListener("click", () => {
    popupImageElement.src = item.link;
    popupImageElement.alt = item.name;
    popupImageCaption.textContent = item.name;
    openPopup(popupImage);
  });

  newCardElement
    .querySelector(".cards__like")
    .addEventListener("click", toggleLike);
  newCardElement
    .querySelector(".cards__trash")
    .addEventListener("click", deleteCard);

  return newCardElement;
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

  const newCard = makeCard({
    name: popupMestoName.value,
    link: popupMestoPath.value,
  });

  cardsContainer.prepend(newCard);

  closePopup(popupMesto);
}

// открытие профиля
profileEditButton.addEventListener("click", () => {
  popupProfileName.value = profileTitle.textContent;
  popupProfileAbout.value = profileSubtitle.textContent;

  resetErrors(popupProfile, settings);
  openPopup(popupProfile);
});

// закрытие профиля
popupProfileCloseButton.addEventListener("click", () => {
  closePopup(popupProfile);
});

// открытие места
mestoAddButton.addEventListener("click", () => {
  popupMestoForm.reset();
  resetErrors(popupMesto, settings);
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

const cards = initialCards.map(makeCard);
cardsContainer.append(...cards);
