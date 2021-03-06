export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    errorSelector: ".error-message",
    buttonSelector: ".popup__save-button",
    inputErrorClass: "popup__input_type_error",
    errorVisibleClass: "error-message_visible",
    inactiveButtonClass: "popup__save-button_disabled"
}

export const editPopup = document.querySelector(".popup_type_edit");
export const addPopup = document.querySelector(".popup_type_new-card");
export const addFormPopup = addPopup.querySelector(".popup__form");

export const editPopupButton = document.querySelector(".profile__edit-button");
export const addCardButton = document.querySelector(".profile__add-button");
export const avatarButton = document.querySelector(".profile__avatar-button");

export const avatarForm = document.querySelector(".popup__form_type_avatar");

export const inputProfileName = document.querySelector(".popup__input_profile_name");
export const inputProfileProfession = document.querySelector(".popup__input_profile_profession");

export const cardTemplateSelector = ".card_template";

export const initialCards = [{
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