export class UserInfo {
    constructor({ nameSelector, professionSelector }) {
        this._nameElement = document.querySelector(nameSelector)
        this._professionElement = document.querySelector(professionSelector)
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            profession: this._professionElement.textContent
        }
    }

    setUserInfo(title, profession) {
        this._nameElement.textContent = title
        this._professionElement.textContent = profession
    }
} 
