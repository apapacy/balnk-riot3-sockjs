import * as riot from 'riot';
import * as _ from 'lodash';

const localStorageKey = 'some localstorage key';

export class Store {

  constructor() {
    this.deserialize();
    riot.observable(this);
  }

  serialize() {
    this.setStorage(this.data)
  }

  deserialize() {
    this.data = this.getStorage();
  }

  getStorage() {
    const storage = window.localStorage[localStorageKey + '.' + this.name];
    if (!storage) {
      return {};
    } else {
      return JSON.parse(storage);
    }
  }

  setStorage(data) {
    if (typeof data === 'object') {
      window.localStorage[localStorageKey + '.' + this.name] = JSON.stringify(data);
    } else {
      window.localStorage[localStorageKey + '.' + this.name] = '';
    }
  }
}
