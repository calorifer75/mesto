let profileEditButton = document.querySelector(".profile__edit-button");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

let popup = document.querySelector(".popup");
let popupCloseButton = document.querySelector(".popup__close-button");
let popupName = document.querySelector(".popup__input_type_name");
let popupAbout = document.querySelector(".popup__input_type_about");

let form = document.querySelector(".popup__form");

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function popupOpen() {
  popup.classList.add("popup_opened");
  popupName.value = profileTitle.textContent;
  popupAbout.value = profileSubtitle.textContent;
}

function popupClose() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(event) {
  event.preventDefault();

  profileTitle.textContent = popupName.value;
  profileSubtitle.textContent = popupAbout.value;

  popupClose();
}

function makeCard(item) {
  let cardTemplateElement = document.querySelector('.cards__template').content;
  let newCardElement = cardTemplateElement.cloneNode(true);
  newCardElement.querySelector('.cards__photo').src = item.link;
  newCardElement.querySelector('.cards__title').textContent = item.name;
  return newCardElement;
}


const cards = initialCards.map(makeCard);
document.querySelector('.cards').append(...cards);

profileEditButton.addEventListener("click", popupOpen);
popupCloseButton.addEventListener("click", popupClose);
form.addEventListener("submit", formSubmitHandler);
