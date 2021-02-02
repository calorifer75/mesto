import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
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
const userInfoInstance = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__subtitle",
});

const popupImageInstance = new PopupWithImage(".popup_type_image");
popupImageInstance.setEventListeners();

const popupProfileInstance = new PopupWithForm(
  ".popup_type_profile",
  ({ "profile-name": userName, "profile-about": userAbout }) => {
    userInfoInstance.setUserInfo({ userName, userAbout });
    popupProfileInstance.close();
  }
);
popupProfileInstance.setEventListeners();

const popupMestoInstance = new PopupWithForm(
  ".popup_type_mesto",
  ({ "mesto-name": name, "mesto-path": link }) => {
    const cardElement = createCard(
      { name, link },
      ".cards__template",
      popupImageInstance.open.bind(popupImageInstance)
    );

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
      const cardElement = createCard(
        item,
        ".cards__template",
        popupImageInstance.open.bind(popupImageInstance)
      );

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
