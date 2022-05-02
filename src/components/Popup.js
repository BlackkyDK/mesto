export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add("popup_active");
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popup.classList.remove("popup_active");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.code === "Escape") {
            this.close()
        }
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector(".popup__close-button")

        this._popup.addEventListener("click", (e) => {
            if (!e.target.closest(".popup__container") || e.target === closeButton) {
                this.close()
            }
        })
    }
}
 