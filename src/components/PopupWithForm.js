import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, _handleSubmitForm) {
        super(popupSelector)
        this._handleSubmitForm = _handleSubmitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = [...this._form.querySelectorAll(".popup__input")]
    }

    _getInputValues() {
        const values = {}
        this._inputs.forEach((input) => {
            values[input.name] = input.value
        })
        return values
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', () => {
            this._handleSubmitForm(this._getInputValues())
        })
    }

    close() {
        super.close()
        this._form.reset()
    }
} 
