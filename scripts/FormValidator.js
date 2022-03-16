export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._form.querySelector(this._settings.buttonSelector);
    }

    _showError = (inputElement, errorMessage) => {
        const {inputErrorClass, errorVisibleClass} = this._settings;
        const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
        inputElement.classList.add(inputErrorClass);
        errorElement.classList.add(errorVisibleClass);
        errorElement.textContent = errorMessage;
    }
    
    _hideError = (inputElement) => {
        const {inputErrorClass, errorVisibleClass} = this._settings;
        const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorVisibleClass);
        errorElement.textContent = "";
    }

    _validateInput = (inputElement) => {      
        if (inputElement.validity.valid) {
            this._hideError(inputElement);
        } else {
            this._showError(inputElement, inputElement.validationMessage);
        }
    }

    _isFormValid = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _disableButton = () => {
        const { inactiveButtonClass } = this._settings;
        this._buttonElement.classList.add(inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _enableButton = () => {
        const { inactiveButtonClass } = this._settings;
        this._buttonElement.classList.remove(inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    resetValidation() {
        this._toggleButton();
        this._inputList.forEach((inputElement) => {
        this._hideError(inputElement)
        });
    }

    _toggleButton = () => { 
        if (this._isFormValid()) {
            this._disableButton();            
        } else {
            this._enableButton();   
        }
    }

    _setEventListeners() {
        this._toggleButton();
        this._inputList.forEach ((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._validateInput(inputElement);
                this._toggleButton();
            });
        });
    }
    
    enableValidation() {
        this._form.addEventListener("submit", (event) => {
            event.preventDefault();
        });
        this._setEventListeners();
        }
    }
