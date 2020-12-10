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

// начальные значения карточек
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// открытие формы редактирования профиля
function openPopupProfile() {
  popupProfile.classList.add("popup_opened");
  popupProfileName.value = profileTitle.textContent;
  popupProfileAbout.value = profileSubtitle.textContent;
}

// закрытие формы редактирования профиля
function closePopupProfile() {
  popupProfile.classList.remove("popup_opened");
}

// отправка формы редактирования профиля
function popupProfileFormSubmitHandler(event) {
  event.preventDefault();

  profileTitle.textContent = popupProfileName.value;
  profileSubtitle.textContent = popupProfileAbout.value;

  closePopupProfile();
}

// открытие формы добавления места
function openPopupMesto() {
  popupMesto.classList.add("popup_opened");
}

// закрытие формы добавления места
function closePopupMesto() {
  popupMesto.classList.remove("popup_opened");
}

// отправка формы добавления места
function popupMestoFormSubmitHandler(event) {
  event.preventDefault();

  const newCard = makeCard({
    name: popupMestoName.value,
    link: popupMestoPath.value,
  });

  document.querySelector(".cards").prepend(newCard);

  closePopupMesto();
}

// открытие всплывающей фотографии
function openPopupImage(evt) {
  popupImage.classList.add("popup_opened");
  popupImage.querySelector(".popup__image").src = evt.target.src;
  popupImage.querySelector(".popup__image-caption").textContent = evt.target
    .closest(".cards__card").querySelector(".cards__info").textContent;
}

// закрытие всплывающей фотографии
function closePopupImage() {
  popupImage.classList.remove("popup_opened");
}

// создание новой карточки
function makeCard(item) {
  let cardTemplateElement = document.querySelector(".cards__template").content;
  let newCardElement = cardTemplateElement.cloneNode(true);

  newCardElement.querySelector(".cards__title").textContent = item.name;
  newCardElement.querySelector(".cards__photo").src = item.link;
  newCardElement
    .querySelector(".cards__like")
    .addEventListener("click", toggleLike);
  newCardElement
    .querySelector(".cards__trash")
    .addEventListener("click", deleteCard);
  newCardElement
    .querySelector(".cards__photo")
    .addEventListener("click", openPopupImage);

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

profileEditButton.addEventListener("click", openPopupProfile);
popupProfileCloseButton.addEventListener("click", closePopupProfile);
popupProfileForm.addEventListener("submit", popupProfileFormSubmitHandler);

mestoAddButton.addEventListener("click", openPopupMesto);
popupMestoCloseButton.addEventListener("click", closePopupMesto);
popupMestoForm.addEventListener("submit", popupMestoFormSubmitHandler);

popupImageCloseButton.addEventListener("click", closePopupImage);

const cards = initialCards.map(makeCard);
document.querySelector(".cards").append(...cards);
