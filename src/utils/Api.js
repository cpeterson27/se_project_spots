// utils/Api.js

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

addNewCard({ name, link }) {
  console.log({ name, link })
  return fetch(`${this._baseUrl}/cards`, {
    method: "POST",
    headers: this._headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  return Promise.reject(`Error: ${res.status}`);
  });
}


editUserInfo({ name, about }) {
  return fetch(`${this._baseUrl}/users/me`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  return Promise.reject(`Error: ${res.status}`);
  });
}

deleteCard(id) {
  return fetch(`${this._baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: this._headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  return Promise.reject(`Error: ${res.status}`);
  });
}

changeLikeStatus(id, isLiked) {
  return fetch(`${this._baseUrl}/cards/${id}/likes`, {
    method: isLiked ? "PUT": "DELETE",
    headers: this._headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  return Promise.reject(`Error: ${res.status}`);
  });
}

updateAvatar({ avatar }) {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({ avatar }),
  }).then((res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
);
}
}

export default Api;
