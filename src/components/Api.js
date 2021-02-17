const fetchHandle = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    `Ошибка чтения/записи данных профиля: статус ${res.status}`
  );
};

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(this._baseUrl + "users/me/", {
      method: "GET",
      headers: this._headers,
    }).then(fetchHandle);
  }

  setUserInfo({ name, about }) {
    return fetch(this._baseUrl + "users/me/", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(fetchHandle);
  }

  getInitialCards() {
    return fetch(this._baseUrl + "cards/", {
      method: "GET",
      headers: this._headers,
    }).then(fetchHandle);
  }

  addNewCard({ name, link }) {
    return fetch(this._baseUrl + "cards/", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(fetchHandle);
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + "cards/" + String(cardId), {
      method: "DELETE",
      headers: this._headers,
    }).then(fetchHandle);
  }
}

export default Api;
