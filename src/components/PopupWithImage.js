import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._image = this._popup.querySelector(".popup__image");
        this._titleImage = this._popup.querySelector(".popup__title-image")
    }
    
    open(text, link) {
        this._image.src = link;
        this._image.alt = text;
        this._titleImage.textContent = text;

        super.open()
    }
} 
