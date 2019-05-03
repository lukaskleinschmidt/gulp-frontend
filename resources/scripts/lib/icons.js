export default function createIcons(url, ttl = 86400000, key = url) {
  load().then(insert);

  function load() {
    const value = get();
    if (value) return Promise.resolve(value);
    return fetch(url)
      .then(parse)
      .then(store);
  }

  function get() {
    try {
      const string = localStorage.getItem(key);
      const data = JSON.parse(string);
      return Date.now() < data.expires ? data.value : flush();
    } catch (e) {
      return null;
    }
  }

  function store(value) {
    if (!value) return value;
    const data = { expires: Date.now() + ttl, value }
    const string = JSON.stringify(data);
    localStorage.setItem(key, string);
    return value;
  }

  function insert(value) {
    if (!value) return value;
    document.body.insertAdjacentHTML('beforeend', value);
    document.body.lastElementChild;
    return value;
  }

  function parse({ text, status }) {
    return status === 200 ? text() : null;
  }

  function flush() {
    localStorage.removeItem(key);
    return null;
  }

  return {
    flush,
  }
}
