import { openPopup, photoPopup, popupImage, popupTitleImage } from "./index.js";

export class Card {
    constructor(data, cardTemplateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardTemplateSelector = cardTemplateSelector;
    }
    
    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardTemplateSelector).content.cloneNode(true);
        return cardTemplate;
    }
    
    _likePhoto(event) {
        event.target.classList.toggle("card__like-button_active");
    }

    _deletePhoto(event) {
        event.target.closest(".card").remove();
    }

    _photoPopup () {
        popupTitleImage.textContent = this._name;
        popupImage.src = this._link;
        popupImage.alt = this._name;

        openPopup(photoPopup);
    }

    _setEventListeners() {
        this._element.querySelector(".card__like-button").addEventListener("click", (event) => {
            this._likePhoto(event);
        });
        this._element.querySelector(".card__delete-button").addEventListener("click", (event) => {
            this._deletePhoto(event);
        });
        this._cardImage.addEventListener("click", () => {
            this._photoPopup();
        });
    }

    createCard = () => {
        this._element = this._getTemplate();
        this._element.querySelector(".card__title").textContent = this._name;
        this._cardImage = this._element.querySelector(".card__image");
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setEventListeners();

        return this._element;
    }
}