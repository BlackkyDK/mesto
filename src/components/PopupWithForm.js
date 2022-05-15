import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = [...this._form.querySelectorAll(".popup__input")];
        this._loadButton = this._popup.querySelector(".popup__save-button");
        this._textButton = this._loadButton.textContent;
    }

    _getInputValues() {
        const values = {}
        this._inputs.forEach((input) => {
            values[input.name] = input.value
        })
        return values
    }

    changeSubmitHandler(newSubmitHandler) {
        this._handleSubmitForm = newSubmitHandler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmitForm(this._getInputValues());
        })
    }

    close() {
        super.close()
        this._form.reset()
    }

    renderLoad(isLoad) {

        if (isLoad) {
            this._loadButton.textContent = "Сохранение...";
        } else {
            this._loadButton.textContent = this._textButton;
        }
    }
}