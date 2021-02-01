import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWidthImage from "../components/PopupWidthImage.js";
import PopupWidthForm from "../components/PopupWidthForm.js";
import UserInfo from "../components/UserInfo.js";
import initialCards from "../components/initial-cards";
import './index.css';

// блок карточек
const cardsContainer = document.querySelector(".cards");

// кнопка открытия профиля
const profileEditButton = document.querySelector(".profile__edit-button");

// кнопка добавления карточки
const mestoAddButton = document.querySelector(".profile__add-button");

// создание объектов
const userInfoInstance = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__subtitle",
});

const popupImageInstance = new PopupWidthImage(".popup_type_image");
popupImageInstance.setEventListeners();

const popupProfileInstance = new PopupWidthForm(
  ".popup_type_profile",
  ({ "profile-name": userName, "profile-about": userAbout }) => {
    userInfoInstance.setUserInfo({ userName, userAbout });
    popupProfileInstance.close();
  }
);
popupProfileInstance.setEventListeners();

const popupMestoInstance = new PopupWidthForm(
  ".popup_type_mesto",
  ({ "mesto-name": name, "mesto-path": link }) => {
    const cardInstance = new Card(
      { name, link },
      ".cards__template",
      popupImageInstance.open.bind(popupImageInstance)
    );
    const cardElement = cardInstance.generateCard();

    cardsContainer.prepend(cardElement);
    popupMestoInstance.close();
  }
);
popupMestoInstance.setEventListeners();

// открытие профиля
profileEditButton.addEventListener("click", () => {
  popupProfileInstance.open(userInfoInstance.getUserInfo());
});

// открытие места
mestoAddButton.addEventListener("click", () => {
  popupMestoInstance.open();
});

// создание карточек и вывод в DOM
const cardsSection = new Section(
  {
    defaultItems: initialCards,
    renderItemCallback: (item) => {
      const cardInstance = new Card(
        item,
        ".cards__template",
        popupImageInstance.open.bind(popupImageInstance)
      );
      const cardElement = cardInstance.generateCard();
      return cardElement;
    },
  },
  ".cards"
);

cardsSection.renderDefaultItems();

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
