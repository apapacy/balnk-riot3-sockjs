import * as riot from 'riot';
import * as _ from 'lodash';

const sessionStorageKey = 'some storage key';

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
    const storage = window.sessionStorage[sessionStorageKey + '.' + this.name];
    if (!storage) {
      return {};
    } else {
      return JSON.parse(storage);
    }
  }

  setStorage(data) {
    if (typeof data === 'object') {
      window.sessionStorage[sessionStorageKey + '.' + this.name] = JSON.stringify(data);
    } else {
      window.sessionStorage[sessionStorageKey + '.' + this.name] = '';
    }
  }
}
