export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (res) => {
    if (!res.ok) {
        console.log(`Ошибка: ${res.status}`)
    }
    return res.json()
};

export const register = ({password, email}) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then(res => checkResponse(res))
};

export const authorize = ({password, email}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then((res) => checkResponse(res))
        .then((res) => {
            if (res.token) {
                localStorage.setItem('jwt', res.token);
                return res;
            }
        })

};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => checkResponse(res))

}