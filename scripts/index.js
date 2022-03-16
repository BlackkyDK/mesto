import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { validationConfig, initialCards } from "./constants.js";

const popups = document.querySelectorAll(".popup");

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
export const popupImage = document.querySelector(".popup__image");
export const popupTitleImage = document.querySelector(".popup__title-image");

const editPopup = document.querySelector(".popup_type_edit");
export const addPopup = document.querySelector(".popup_type_new-card");
export const addFormPopup = addPopup.querySelector(".popup__form");
export const photoPopup = document.querySelector(".popup_type_image");

//кнопки
export const savePopupButton = document.querySelector(".popup__save-button");
const editPopupButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

//инпуты
const inputLocationName = document.querySelector(".popup__input_location_name");
const inputLocationLink = document.querySelector(".popup__input_location_link");

const inputProfileName = document.querySelector(".popup__input_profile_name");
const inputProfileProfession = document.querySelector(".popup__input_profile_profession");

const inputList = document.querySelector(".cards");
const cardTemplateSelector = ".card_template";

const editFormValidator = new FormValidator(validationConfig, editPopup);
editFormValidator.resetValidation();
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, addFormPopup);
addCardFormValidator.resetValidation();
addCardFormValidator.enableValidation();

export function openPopup(popup) {
    addCardFormValidator.resetValidation(); 
    popup.classList.add("popup_active");
    document.addEventListener("keydown", closeEsc);
}

function closePopup(popup) {
    popup.classList.remove("popup_active");
    document.removeEventListener("keydown", closeEsc);
}

function closeEsc(event) {
    if (event.code === "Escape") {
        closePopup (document.querySelector(".popup_active"));
    }
}

popups.forEach((popup) => {
    popup.addEventListener("mousedown", (event) => {
        if (event.target.classList.contains("popup_active") || event.target.classList.contains("popup__close-button")) {
            closePopup(popup);
        } 
    });
});

editPopupButton.addEventListener("click", () => {
    openPopup(editPopup);
    inputProfileName.value = profileName.textContent;
    inputProfileProfession.value = profileProfession.textContent;
});

addCardButton.addEventListener("click", () => openPopup(addPopup));

addPopup.addEventListener("submit", (event) => {
    event.preventDefault();
    const locationNameValue = inputLocationName.value;
    const locationLinkValue = inputLocationLink.value;
    const card = {
        name: locationNameValue,
        link: locationLinkValue,     
    }
    
    renderCard(card);
    closePopup(addPopup);

    addFormPopup.reset();
});

editPopup.addEventListener("submit", (event) => {
    event.preventDefault();
    
    profileName.textContent = inputProfileName.value,
    profileProfession.textContent = inputProfileProfession.value,
    closePopup(editPopup);
});

function createCard(data) {
    const card = new Card(data, cardTemplateSelector);
    const cardElement = card.createCard();
    return cardElement;
}

function renderCard(data) {
    const card = createCard(data);
    inputList.prepend(card);
}

initialCards.forEach(renderCard);