import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  initialCards,
  cardsContainer,
  profileEditButton,
  mestoAddButton,
} from "../utils/constants";
import "./index.css";

// возвращает готовый HTML элемент карточки
function createCard({ name, link }, cardSelector, openPopupImageCallback) {
  const cardInstance = new Card(
    { name, link },
    cardSelector,
    openPopupImageCallback
  );
  return cardInstance.generateCard();
}

// создание объектов
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20/",
  headers: {
    authorization: "cf384566-77ec-4529-bbb1-a6b45956753d",
    "Content-Type": "application/json",
  },
});

const userInfoInstance = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

const popupImageInstance = new PopupWithImage(".popup_type_image");
popupImageInstance.setEventListeners();

const popupProfileInstance = new PopupWithForm(
  ".popup_type_profile",
  ({ "profile-name": name, "profile-about": about }) => {
    api
      .setUserInfo({ name, about })
      .then((newUserInfo) => {
        userInfoInstance.render(newUserInfo);
        popupProfileInstance.close();
      })
      .catch((err) => console.log(err));
  }
);
popupProfileInstance.setEventListeners();

const popupMestoInstance = new PopupWithForm(
  ".popup_type_mesto",
  ({ "mesto-name": name, "mesto-path": link }) => {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        const cardElement = createCard(
          newCard,
          ".cards__template",
          popupImageInstance.open.bind(popupImageInstance)
        );

        cardsContainer.prepend(cardElement);
        popupMestoInstance.close();
      })
      .catch((err) => console.log(err));
  }
);
popupMestoInstance.setEventListeners();

// открытие профиля
profileEditButton.addEventListener("click", () => {
  api
    .getUserInfo()
    .then((userInfo) => {
      popupProfileInstance.open(userInfo);
    })
    .catch((err) => console.log(err));
});

// открытие места
mestoAddButton.addEventListener("click", () => {
  popupMestoInstance.open();
});

// вывод профиля
api
  .getUserInfo()
  .then((userInfo) => {
    userInfoInstance.render(userInfo);
  })
  .catch((err) => console.log(err));

// создание карточек и вывод в DOM
const cardsSection = new Section((item) => {
  const cardElement = createCard(
    item,
    ".cards__template",
    popupImageInstance.open.bind(popupImageInstance)
  );

  return cardElement;
}, ".cards");

api
  .getInitialCards()
  .then((cards) => {
    cardsSection.renderItems(cards);
  })
  .catch((err) => console.log(err));

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
