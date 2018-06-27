function storageAvailable(type) {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      e.code === 22 ||
      e.code === 1014 ||
      e.name === 'QuotaExceededError' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
    ) && storage.length !== 0;
  }
}

// IDEA: fallback to simple object storage

class Storage {
  constructor(type) {
    this.available = storageAvailable(type)
    this.type = type
  }

  get(key) {
    if (!this.available) return null

    const entry = JSON.parse(window[this.type].getItem(key) || '0');

    if (!entry) return null;

    if (entry.expires && entry.expires < Date.now()) {
      this.flush(key)
      return null;
    }

    return entry.value;
  }

  getItem() {
    return this.get(...arguments)
  }

  set(key, value, ttl = false) {
    if (!this.available) return

    window[this.type].setItem(key, JSON.stringify({
      expires: ttl === false ? false : Date.now() + ttl,
      value: value
    }));
  }

  setItem() {
    this.set(...arguments)
  }

  flush(key) {
    window[this.type].removeItem(key);
  }
}

export const sessionStorage = new Storage('sessionStorage')
export const localStorage = new Storage('localStorage')
