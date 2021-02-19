import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithButton from "../components/PopupWithButton.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  cardsContainer,
  profileEditButton,
  mestoAddButton,
} from "../utils/constants";
import "./index.css";

// получает с сервера и отрисовывает профиль
function renderProfile() {
  api
    .getUserInfo()
    .then((userInfo) => {
      userInfoInstance.render(userInfo);
    })
    .catch((err) => console.log(err));
}

// возвращает готовый HTML элемент карточки
function createCard(
  cardInfo,
  cardSelector,
  openPopupImageCallback,
  openPopupDeleteCallback,
  toggleLikeCallback
) {
  const cardInstance = new Card(
    cardInfo,
    cardSelector,
    openPopupImageCallback,
    openPopupDeleteCallback,
    toggleLikeCallback
  );
  return cardInstance.generateCard();
}

// коллбэк переключения лайков
function toggleLike(cardObj) {
  let action = cardObj._isMyLike ? "remove" : "add";

  api
    .toggleLike(cardObj._cardId, action)
    .then((cardInfo) => {
      cardObj._likeElement.classList.toggle("cards__like_liked");
      cardObj._likeCountElement.textContent = cardInfo.likes.length;
      cardObj._isMyLike = !cardObj._isMyLike;
    })
    .catch((err) => console.log(err));
}

// создание api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20/",
  headers: {
    authorization: "cf384566-77ec-4529-bbb1-a6b45956753d",
    "Content-Type": "application/json",
  },
});

// создание попупа для смены аватара
const popupChangeAvatarInstance = new PopupWithForm(
  ".popup_type_change-avatar",
  ({ "avatar-path": link }, buttonElement) => {
    //
    // колбэк сохранения аватара
    //
    const buttonText = buttonElement.textContent;
    buttonElement.textContent = "Сохранение...";

    api
      .changeAvatar(link)
      .then(() => {
        renderProfile();
        popupChangeAvatarInstance.close();
      })
      .catch((err) => console.log(err))
      .finally(() => (buttonElement.textContent = buttonText));
  }
);
popupChangeAvatarInstance.setEventListeners();

// создание userInfo
const userInfoInstance = new UserInfo(
  {
    nameSelector: ".profile__title",
    aboutSelector: ".profile__subtitle",
    avatarSelector: ".profile__avatar",
    changeAvatarSelector: ".profile__avatar-change",
  },
  // колбэк открытия попупа для смены аватара
  popupChangeAvatarInstance.open.bind(popupChangeAvatarInstance)
);

// создание попупа для удаления карточки
const popupDeleteInstance = new PopupWithButton(
  ".popup_type_delete",
  (cardElement, cardId) => {
    //
    // колбэк удаления карточки
    //
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        popupDeleteInstance.close();
      })
      .catch((err) => console.log(err));
  }
);
popupDeleteInstance.setEventListeners();

// создание попупа для картинки из карточки
const popupImageInstance = new PopupWithImage(".popup_type_image");
popupImageInstance.setEventListeners();

// создание попупа профиля
const popupProfileInstance = new PopupWithForm(
  ".popup_type_profile",
  ({ "profile-name": name, "profile-about": about }, buttonElement) => {
    //
    // колбэк сохранения профиля
    //
    const buttonText = buttonElement.textContent;
    buttonElement.textContent = "Сохранение...";

    api
      .setUserInfo({ name, about })
      .then((newUserInfo) => {
        userInfoInstance.render(newUserInfo);
        popupProfileInstance.close();
      })
      .catch((err) => console.log(err))
      .finally(() => (buttonElement.textContent = buttonText));
  }
);
popupProfileInstance.setEventListeners();

// создание попупа карточки
const popupMestoInstance = new PopupWithForm(
  ".popup_type_mesto",
  ({ "mesto-name": name, "mesto-path": link }, buttonElement) => {
    //
    // колбэк сохранения карточки
    //
    const buttonText = buttonElement.textContent;
    buttonElement.textContent = "Создание...";

    api
      .addNewCard({ name, link })
      .then((newCard) => {
        const cardElement = createCard(
          newCard,
          ".cards__template",
          popupImageInstance.open.bind(popupImageInstance),
          popupDeleteInstance.open.bind(popupDeleteInstance),
          toggleLike
        );

        cardsContainer.prepend(cardElement);
        popupMestoInstance.close();
      })
      .catch((err) => console.log(err))
      .finally(() => (buttonElement.textContent = buttonText));
  }
);
popupMestoInstance.setEventListeners();

// нажатие кнопки открытия профиля
profileEditButton.addEventListener("click", () => {
  //
  // колбэк открытия профиля
  //
  api
    .getUserInfo()
    .then((userInfo) => {
      popupProfileInstance.open(userInfo);
    })
    .catch((err) => console.log(err));
});

// нажатие кнопки добавления карточки
mestoAddButton.addEventListener("click", () => {
  popupMestoInstance.open();
});

// отрисовка профиля
renderProfile();

// создание объекта для отрисовки карточек
const cardsSection = new Section((item) => {
  //
  // колбэк отрисовки карточки
  //
  const cardElement = createCard(
    item,
    ".cards__template",
    popupImageInstance.open.bind(popupImageInstance),
    popupDeleteInstance.open.bind(popupDeleteInstance),
    toggleLike
  );

  return cardElement;
}, ".cards");

// получение карточек с сервера и вызов их отрисовки
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
