class Api {
    constructor(props) {
        this._baseUrl = props.baseUrl;
        this._authorization = props.headers.authorization;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `${this._authorization}`
            }
        })
            .then(res => this._checkResponse(res));
    }

    getUserInformation() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `${this._authorization}`
            }
        })
            .then(res => this._checkResponse(res));
    }

    setUserInformation({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`,
                about: `${about}`
            })
        })
            .then(res => this._checkResponse(res));
    }

    postNewCard({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${name}`,
                link: `${link}`
            })
        })
            .then(res => this._checkResponse(res));
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._checkResponse(res));
    }

    addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._checkResponse(res))
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => this._checkResponse(res))
    }

    changeLikeCardStatus(id,like) {
        if(like) {
            return this.addLike(id)
        } else {
            return this.deleteLike(id)
        }
    }

    editAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._authorization}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(res => this._checkResponse(res));
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

// другие методы работы с API
}

export default new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47',
    headers: {
        authorization: '74bc18a1-28e6-48d3-a590-75a477f90392',
        'Content-Type': 'application/json'
    }
});
