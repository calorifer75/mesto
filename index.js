let profileEditButton = document.querySelector(".profile__edit-button");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

let popup = document.querySelector(".popup");
let popupCloseButton = document.querySelector(".popup__close-button");
let popupName = document.querySelector("#name");
let popupAbout = document.querySelector("#about");

let form = document.querySelector("#popup-form");

profileEditButton.addEventListener("click", function () {
  popup.classList.add("popup_opened");
  popupName.value = profileTitle.textContent;
  popupAbout.value = profileSubtitle.textContent;
});

popupCloseButton.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});

function formSubmitHandler(event) {
  event.preventDefault();

  profileTitle.textContent = popupName.value;
  profileSubtitle.textContent = popupAbout.value;

  popup.classList.remove("popup_opened");
}

form.addEventListener("submit", formSubmitHandler);
