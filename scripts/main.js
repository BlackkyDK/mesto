const popups = document.querySelectorAll(".popup");

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const popupImage = document.querySelector(".popup__image");
const popupTitleImage = document.querySelector(".popup__title-image");

const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const addFormPopup = addPopup.querySelector(".popup__form");
const photoPopup = document.querySelector(".popup_type_image");

//кнопки
const savePopupButton = document.querySelector(".popup__save-button");
const savePopupLocButton = document.querySelector(".popup__save-button_location");
const editPopupButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const closeEditButton = editPopup.querySelector(".popup__close-button");
const closeAddButton = addPopup.querySelector(".popup__close-button");
const closePhotoButton = photoPopup.querySelector(".popup__close-button");

//инпуты
const inputLocationName = document.querySelector(".popup__input_location_name");
const inputLocationLink = document.querySelector(".popup__input_location_link");

const inputProfileName = document.querySelector(".popup__input_profile_name");
const inputProfileProfession = document.querySelector(".popup__input_profile_profession");

const list = document.querySelector(".cards");
const cardTemplate = document.querySelector(".card_template").content;


function openPopup(popup) {
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
    popup.addEventListener("click", (event) => {
        if (event.target.classList.contains("popup_active") || event.target.classList.contains("popup_close")) {
            closePopup(popup);
        }
    });
});

editPopupButton.addEventListener("click", () => {
    openPopup(editPopup);
    inputProfileName.value = profileName.textContent;
    inputProfileProfession.value = profileProfession.textContent;
});

closeEditButton.addEventListener("click", () => closePopup(editPopup));

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
  
    savePopupLocButton.setAttribute("disabled", true);
    savePopupLocButton.classList.add("popup__save-button_disabled");

    addFormPopup.reset();
});

closeAddButton.addEventListener("click", () => closePopup(addPopup));

editPopup.addEventListener("submit", (event) => {
    event.preventDefault();
    
    profileName.textContent = inputProfileName.value,
    profileProfession.textContent = inputProfileProfession.value,
    closePopup(editPopup);
    
});

//карточки template
const initialCards = [{
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

function createCard(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    likeButton.addEventListener("click", function(event) {
        event.target.classList.toggle("card__like-button_active");
    });

    deleteButton.addEventListener("click", function(event) {
        event.target.closest(".card").remove();
    });

    cardImage.addEventListener("click", () => {
        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        popupTitleImage.textContent = cardData.name;
        openPopup(photoPopup);
    });

    return cardElement;
}
closePhotoButton.addEventListener("click", () => closePopup(photoPopup));

function renderCard(cardData) {
    const card = createCard(cardData);
    list.prepend(card);
}

initialCards.forEach(renderCard);