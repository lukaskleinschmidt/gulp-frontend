import Module from 'module'

export default class extends Module {
  init(url, ttl, key) {
    this.ttl = ttl || 1000 * 60 * 60 * 24 // 24 hours
    this.key = key || 'icons'

    let icons = this.get()

    if (icons) return this.insert(icons)

    return fetch(url)
      .then(response => response.text())
      .then(icons => {
        this.set(icons, this.ttl)
        this.insert(icons)
      })
  }

  get() {
    const data = localStorage.getItem(this.key)

    if (!data) return null

    const entry = JSON.parse(data)

    if (entry.expires < Date.now()) {
      this.flush()
      return null
    }

    return entry.value
  }

  set(value, ttl) {
    const data = JSON.stringify({
      expires: Date.now() + ttl,
      value: value
    })

    localStorage.setItem(this.key, data)
  }

  insert(icons) {
    if (!icons) return
    document.body.insertAdjacentHTML('beforeend', icons)
    this.icons = document.body.lastElementChild
  }

  flush() {
    localStorage.removeItem(this.key)
  }

  destroy() {
    if (this.icons) document.body.removeChild(this.icons)
    this.flush()
  }
}
