export class UserInfo {
    constructor({ nameSelector, professionSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector)
        this._professionElement = document.querySelector(professionSelector)
        this._avatarElement = document.querySelector(avatarSelector)
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            profession: this._professionElement.textContent,
            avatar: this._avatarElement.src,
        }
    }

    setUserInfo(title, profession) {
        this._nameElement.textContent = title
        this._professionElement.textContent = profession
    }

    setAvatar(avatar) {
        this._avatarElement.src = avatar;
    }
} 