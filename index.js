let profileEditButton = document.querySelector(".profile__edit-button");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

let popup = document.querySelector(".popup");
let popupCloseButton = document.querySelector(".popup__close-button");
let popupName = document.querySelector(".popup__input_name");
let popupAbout = document.querySelector(".popup__input_about");

let form = document.querySelector(".popup__form");

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

profileEditButton.addEventListener("click", popupOpen);
popupCloseButton.addEventListener("click", popupClose);
form.addEventListener("submit", formSubmitHandler);
