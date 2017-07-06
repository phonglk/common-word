/* eslint-disable no-underscore-dangle */

async function _set(obj, storage = 'sync') {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage[storage].set(obj, () => {
        resolve();
      });
    } catch (e) {
      reject(e);
    }
  });
}

async function _get(obj = null, storage = 'sync') {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage[storage].get((items) => {
        resolve(items);
      });
    } catch (e) {
      reject(e);
    }
  });
}

async function get(key, storage) {
  try {
    const items = await _get(null, storage);
    return items[key];
  } catch (e) {
    return null;
  }
}

async function set(key, value, storage) {
  const items = await _get(null, storage)
  const updatedItems = Object.assign({}, items, {
    [key]: value,
  });
  await _set(updatedItems, storage);
  return true;
}

function getSync(key) {
  return get(key, 'sync');
}

function setSync(key, value) {
  return set(key, value, 'sync');
}

function getLocal(key) {
  return get(key, 'local');
}

function setLocal(key, value) {
  return set(key, value, 'local');
}

export {
  getSync,
  setSync,
  getLocal,
  setLocal,
  _set,
  _get,
};
