import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { validationConfig, initialCards } from "../components/constants.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import '../pages/index.css';

let userId;

api.getProfile()
    .then(res => {
        console.log(res)
        userInfo.setUserInfo(res.name, res.about);
        userInfo.setAvatar(res.avatar);
        userId = res._id
    })

api.getInitialCards()
    .then(cardList => {
        cardList.forEach(data => {
            const card = createCard({
                name: data.name,
                link: data.link,
                likes: data.likes,
                id: data._id,
                userId: userId,
                ownerId: data.owner._id
            });
            section.addItem(card)
        })
    })

const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");

const addFormPopup = addPopup.querySelector(".popup__form");

const editPopupButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__avatar-button");

const avatarForm = document.querySelector(".popup__form_type_avatar");

const inputProfileName = document.querySelector(".popup__input_profile_name");
const inputProfileProfession = document.querySelector(".popup__input_profile_profession");

const cardTemplateSelector = ".card_template";

const editFormValidator = new FormValidator(validationConfig, editPopup);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, addFormPopup);
addCardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.enableValidation();

const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    professionSelector: ".profile__profession",
    avatarSelector: '.profile__avatar'
});

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

    api.editProfile(name, profession)
        .then(() => {
            userInfo.setUserInfo(name, profession)
        })

    editProfilePopup.close();
}

const handleCardSubmit = (data) => {
    api.addCard(data.name, data.link)
        .then(res => {
            const card = createCard({
                name: res.name,
                link: res.link,
                likes: res.likes,
                id: res._id,
                userId: userId,
                ownerId: res.owner._id
            });
            section.addItem(card);
            addCardPopup.close();
        })
}

const handleAvatarSubmit = (data) => {
    const { avatar } = data

    api.changeAvatar(avatar)
        .then(() => {
            userInfo.setAvatar(avatar)
        })
    avatarPopup.close()
}

function createCard(data) {
    const card = new Card(data, cardTemplateSelector, () => {
            imagePopup.open(data.name, data.link)
        },
        (id) => {
            deletePopup.open()
            deletePopup.changeSubmitHandler(() => {
                api.deleteCard(id)
                    .then(res => {
                        card.deleteCard(),
                            deletePopup.close()
                    })
            })
        },
        (id) => {
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
            } else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
            }
        }
    );

    const cardElement = card.createCard();
    return cardElement;
}

const section = new Section({ items: [], renderer: data => { section.addItem(createCard(data)) } }, ".cards");
section.renderItems();

const imagePopup = new PopupWithImage(".popup_type_image");
const editProfilePopup = new PopupWithForm(".popup_type_edit", handleProfileSubmit);
const addCardPopup = new PopupWithForm(".popup_type_new-card", handleCardSubmit);
const deletePopup = new PopupWithForm(".popup_type_delete");
const avatarPopup = new PopupWithForm(".popup_type_avatar", handleAvatarSubmit);

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
deletePopup.setEventListeners();
avatarPopup.setEventListeners();

avatarButton.addEventListener("click", () => {

    avatarFormValidator.resetValidation();
    avatarPopup.open();
});