let profile = document.querySelector(".profile");
let openPopupButton = profile.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closePopupButton = popup.querySelector(".popup__close-button");
let form = document.querySelector(".popup__form");
let savePopupButton = form.querySelector(".popup__save-button");

let profileName = document.getElementById("profile__name");
let popupName = document.getElementById("popup__name");
let profileProfession = document.getElementById("profile__profession");
let popupProfession = document.getElementById("popup__profession");

function openPopup() {
    popupName.value = profileName.textContent;
    popupProfession.value = profileProfession.textContent;
    popup.classList.add("popup_active");
}

function savePopupChanges(submit) {
    submit.preventDefault();
    profileName.textContent = popupName.value;
    profileProfession.textContent = popupProfession.value;
    closePopup();
}

function closePopup() {
    popup.classList.remove("popup_active");
}

openPopupButton.addEventListener("click", openPopup);
form.addEventListener("submit", savePopupChanges);
closePopupButton.addEventListener("click", closePopup);
