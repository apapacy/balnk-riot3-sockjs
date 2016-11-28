import 'fetch';

export class Service {
  constructor() {
    this.baseUrl = '/api';
  }

  postJson(uri, data) {
    return fetch(
        uri, {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
        })
      .then(function(data) {
        if (!data.ok) {
          return data.json().then(function(data) {
            throw data;
          });
        } else {
          return data.json();
        }
      })
  };

  getJson(uri) {
    return fetch(
        uri, {
          method: 'get',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
        })
      .then(function(data) {
        if (!data.ok) {
          return data.json().then(function(data) {
            throw data;
          });
        } else {
          return data.json();
        }
      })
  };
}
