import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    open(text, link) {
        const image = this._popup.querySelector(".popup__image")
        const titleImage = this._popup.querySelector(".popup__title-image")

        image.src = link
        titleImage.textContent = text

        super.open()
    }
} 
