export class Card {
    constructor(data, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data.id;
        this._userId = data.userId;
        this._ownerId = data.ownerId;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;

    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardTemplateSelector).content.querySelector('.card').cloneNode(true);
        return cardTemplate;
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    isLiked() {
        const userIdLike = this._likes.find(user => user._id === this._userId)

        return userIdLike
    }

    setLikes(newLikes) {
        this._likes = newLikes

        this._likeNumberElement.textContent = this._likes.length

        if (this.isLiked()) {
            this._onLike()
        } else {
            this._offLike()
        }
    }

    _onLike() {
        this._likeButton.classList.add("card__like-button_active");
    }

    _offLike() {
        this._likeButton.classList.remove("card__like-button_active");
    }

    createCard = () => {
        this._element = this._getTemplate();
        this._element.querySelector(".card__title").textContent = this._name;
        this._cardImage = this._element.querySelector(".card__image");
        this._deleteButton = this._element.querySelector(".card__delete-button");
        this._likeButton = this._element.querySelector(".card__like-button");
        this._likeNumberElement = this._element.querySelector('.card__like-number');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setEventListeners();
        this.setLikes(this._likes);

        if (this._ownerId !== this._userId) {
            this._deleteButton.style.display = 'none'
        }
        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", () => {
            this._handleLikeClick(this._id);
        });
        this._deleteButton.addEventListener("click", () => {
            this._handleDeleteClick(this._id);
        });
        this._cardImage.addEventListener("click", (event) => {
            this._handleCardClick(event);
        });
    }
}