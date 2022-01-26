const popup = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const popupImage = document.querySelector(".popup__image");
const popupTitleImage = document.querySelector(".popup__title-image");

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

//модалки
const editModal = document.querySelector(".popup_type_edit");
const addModal = document.querySelector(".popup_type_new-card");
const photoModal = document.querySelector(".popup_type_image");

//формы
const editForm = editModal.querySelector(".popup__form");
const addForm = addModal.querySelector(".popup__form");

//кнопки
const savePopupButton = document.querySelector(".popup__save-button");

const editPopupButton = document.querySelector(".profile__edit-button");
const closeEditModalButton = editModal.querySelector(".popup__close-button");

const addCardButton = document.querySelector(".profile__add-button");
const closeAddModalButton = addModal.querySelector(".popup__close-button");

const closePhotoModalButton = photoModal.querySelector(".popup__close-button");

//инпуты
const inputLocationName = document.querySelector(".popup__input_location_name");
const inputLocationLink = document.querySelector(".popup__input_location_link");

const inputProfileName = document.querySelector(".popup__input_profile_name");
const inputProfileProfession = document.querySelector(".popup__input_profile_profession");

const list = document.querySelector(".cards");
const cardTemplate = document.querySelector(".card_template").content;

//toggle
function tooglePopup(modal) {
    modal.classList.toggle("popup_active");
}

editPopupButton.addEventListener("click", () => {
    inputProfileName.value = profileName.textContent  
    inputProfileProfession.value = profileProfession.textContent
    tooglePopup(editModal)}
);

closeEditModalButton.addEventListener("click", () => tooglePopup(editModal));

addCardButton.addEventListener("click", () => tooglePopup(addModal));
closeAddModalButton.addEventListener("click", () => tooglePopup(addModal));

closePhotoModalButton.addEventListener("click", () => tooglePopup(photoModal));

//добавление карточки
addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const locationNameValue = inputLocationName.value;
    const locationLinkValue = inputLocationLink.value;
    const card = {
        name: locationNameValue,
        link: locationLinkValue,
    }

    inputLocationName.value = "";
    inputLocationLink.value = "";
    
    renderCard(card);
    tooglePopup(addModal);
})

editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    profileName.textContent = inputProfileName.value,
    profileProfession.textContent = inputProfileProfession.value,

    tooglePopup(editModal);
})

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

    deleteButton.addEventListener('click', function(event) {
        event.target.closest(".card").remove();
    });

    cardImage.addEventListener('click', () => {
        popupImage.src = cardData.link;
        popupImage.alt = cardData.name;
        popupTitleImage.textContent = cardData.name;
        tooglePopup(photoModal);
    })
    return cardElement;
}

function renderCard(cardData) {
    const card = createCard(cardData);
   list.prepend(card);
}

initialCards.forEach(renderCard);
