export const persist = store => next => action => {
  const returns = next(action);
  console.log('persist');
  console.log(store.getState());
  serialize(store)
  return returns;
};

const sessionStorageKey = 'some key';

function serialize(store) {
  setStorage(store.getState())
}

export function deserialize() {
  return getStorage();
}

function getStorage() {
  if (!window || !window.sessionStorage) {
    return;
  }
  const storage = window.sessionStorage[sessionStorageKey];
  if (!storage) {
    return {};
  } else {
    return JSON.parse(storage);
  }
}

function setStorage(state) {
  if (typeof state === 'object') {
    window.sessionStorage[sessionStorageKey] = JSON.stringify(state);
  } else {
    window.sessionStorage[sessionStorageKey] = '';
  }
}
