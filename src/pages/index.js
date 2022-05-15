import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { validationConfig, editPopup, addFormPopup, editPopupButton, addCardButton, avatarButton, avatarForm,  inputProfileName, inputProfileProfession, cardTemplateSelector } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import '../pages/index.css';

let userId;

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);
    userId = userData._id;
    cards.forEach( data => {
        const newCard = createCard({ 
            name: data.name, 
            link: data.link, 
            likes: data.likes, 
            id: data._id, 
            userId: userId, 
            ownerId: data.owner._id 
        }); 
        section.addItem(newCard)
   })
})
  .catch(err => {console.log(err)});

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

const editProfilePopup = new PopupWithForm(".popup_type_edit", (data) => {
    editProfilePopup.renderLoad(true)
    const { name, profession } = data

    api.editProfile(name, profession)
        .then(() => {
            userInfo.setUserInfo(name, profession);
            editProfilePopup.close();
        })
        .catch(err => {console.log(err)})
        .finally(() => {editProfilePopup.renderLoad(false)})    
   })

const addCardPopup = new PopupWithForm(".popup_type_new-card", (data) => {
    addCardPopup.renderLoad(true)

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
        .catch(err => {console.log(err)})
        .finally(() => {addCardPopup.renderLoad(false)}) 
})

const avatarPopup = new PopupWithForm(".popup_type_avatar", (data) => {
    avatarPopup.renderLoad(true)
    const { avatar } = data

    api.changeAvatar(avatar)
        .then(() => {
            userInfo.setAvatar(avatar)
            avatarPopup.close()
        })
    .catch(err => {console.log(err)})
    .finally(() => {avatarPopup.renderLoad(false)})
})

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
                    .catch(err => {console.log(err)});

            })
        },
        (id) => {
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
                    .catch(err => {console.log(err)});

            } else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
                    .catch(err => {console.log(err)});
            }
        }
    );

    const cardElement = card.createCard();
    return cardElement;
}

const section = new Section({ items: [], renderer: data => { section.addItem(createCard(data)) } }, ".cards");
//section.renderItems(items);

const imagePopup = new PopupWithImage(".popup_type_image");
const deletePopup = new PopupWithForm(".popup_type_delete");

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
deletePopup.setEventListeners();
avatarPopup.setEventListeners();

avatarButton.addEventListener("click", () => {
    avatarPopup.open();
    avatarFormValidator.resetValidation();  
});