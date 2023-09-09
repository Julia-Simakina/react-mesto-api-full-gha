function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

const REACT_BASE_URL = "https://api.mesto.julias.nomoredomainsicu.ru";

const register = (email, password) => {
  return fetch(`${REACT_BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }).then(res => getResponseData(res));
};

const login = (email, password) => {
  return fetch(`${REACT_BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }).then(res => getResponseData(res));
};

const checkToken = token => {
  return fetch(`${REACT_BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  }).then(res => getResponseData(res));
};

export { register, login, checkToken };
