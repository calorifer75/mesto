// блок карточек
const cardsContainer = document.querySelector(".cards");
const cardTemplateElement = document.querySelector(".cards__template").content;

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
const popupMestoName = popupMesto.querySelector(".popup__input_type_name");
const popupMestoPath = popupMesto.querySelector(".popup__input_type_path");
const popupMestoForm = popupMesto.querySelector(".popup__form");
const mestoAddButton = document.querySelector(".profile__add-button");

// блок переменных всплывающей фотографии
const popupImage = document.querySelector(".popup_type_image");
const popupImageCloseButton = popupImage.querySelector(".popup__close-button");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__image-caption");

// открытие попапов
function openPopup(popup, imageInfo = null) {
  popup.classList.add("popup_opened");

  if (popup.classList.contains('popup_type_profile')) {
    // попап профиля
    popupProfileName.value = profileTitle.textContent;
    popupProfileAbout.value = profileSubtitle.textContent;
    return;
  }

  if (popup.classList.contains('popup_type_image')) {
    // попап фотографии
    popupImageElement.src = imageInfo.link;
    popupImageElement.alt = imageInfo.name;
    popupImageCaption.textContent = imageInfo.name;
    return;
  }
}

// закрытие попапов
function closePopup(popup) {
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

  const newCard = makeCard({
    name: popupMestoName.value,
    link: popupMestoPath.value,
  });

  cardsContainer.prepend(newCard);
  popupMestoForm.reset();

  closePopup(popupMesto);
}

// создание новой карточки
function makeCard(item) {
  const newCardElement = cardTemplateElement.cloneNode(true);
  const photoElement = newCardElement.querySelector(".cards__photo");

  newCardElement.querySelector(".cards__title").textContent = item.name;

  photoElement.src = item.link;
  photoElement.alt = item.name;
  photoElement.addEventListener("click", () => openPopup(popupImage, item));

  newCardElement
    .querySelector(".cards__like")
    .addEventListener("click", toggleLike);
  newCardElement
    .querySelector(".cards__trash")
    .addEventListener("click", deleteCard);

  return newCardElement;
}

// переключение лайков
function toggleLike(evt) {
  evt.target.classList.toggle("cards__like_liked");
}

// Удаление карточки
function deleteCard(evt) {
  evt.target.closest(".cards__card").remove();
}

profileEditButton.addEventListener("click", () => openPopup(popupProfile));
popupProfileCloseButton.addEventListener("click", () => closePopup(popupProfile));
popupProfileForm.addEventListener("submit", handleProfileFormSubmit);

mestoAddButton.addEventListener("click", () => openPopup(popupMesto));
popupMestoCloseButton.addEventListener("click", () => closePopup(popupMesto));
popupMestoForm.addEventListener("submit", handleMestoFormSubmit);

popupImageCloseButton.addEventListener("click", () => closePopup(popupImage));

const cards = initialCards.map(makeCard);
cardsContainer.append(...cards);
