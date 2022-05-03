import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { validationConfig, initialCards } from "../components/constants.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");

const addFormPopup = addPopup.querySelector(".popup__form");

const editPopupButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const inputProfileName = document.querySelector(".popup__input_profile_name");
const inputProfileProfession = document.querySelector(".popup__input_profile_profession");

const cardTemplateSelector = ".card_template";

const editFormValidator = new FormValidator(validationConfig, editPopup);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, addFormPopup);
addCardFormValidator.enableValidation();

editPopupButton.addEventListener("click", () => {
    editFormValidator.resetValidation();
    const { name, profession } = userInfo.getUserInfo();
    inputProfileName.value = name
    inputProfileProfession.value = profession;
    editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
    addCardPopup.open();
    addCardFormValidator.resetValidation();
});

const handleProfileSubmit = (data) => {
    const { name, profession } = data
    userInfo.setUserInfo(name, profession)

    editProfilePopup.close();
}

const handleCardSubmit = (data) => {
    const card = createCard({
        name: data.name,
        link: data.link
    });

    section.addItem(card);
    addCardPopup.close();
}

function createCard(data) {
    const card = new Card(data, cardTemplateSelector, () => {
        imagePopup.open(data.name, data.link)
    });
    
    const cardElement = card.createCard(); 
    return cardElement; 
}

const section = new Section({ items: initialCards, renderer: data => {section.addItem(createCard(data))} }, ".cards");
section.renderItems();

const imagePopup = new PopupWithImage(".popup_type_image");
const editProfilePopup = new PopupWithForm(".popup_type_edit", handleProfileSubmit);
const addCardPopup = new PopupWithForm(".popup_type_new-card", handleCardSubmit);

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

const userInfo = new UserInfo({ nameSelector: ".profile__name", professionSelector: ".profile__profession" });
