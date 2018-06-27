import { localStorage } from '@modules/storage'
import Module from 'module'

export default class Icons extends Module {
  init(url, options) {
    this.options = Object.assign({}, {
      key: 'icons',
      ttl: 300000
    }, options || {})

    let icons

    if (localStorage.available) {
      icons = localStorage.getItem(this.options.key)
      this.insert(icons)
    }

    if (!icons) {
      fetch(url)
        .then(response => response.text())
        .then(icons => {
          if (localStorage.available) {
            localStorage.setItem(this.options.key, icons, this.options.ttl);
          }
          this.insert(icons);
        });
    }
  }

  insert(icons) {
    if (!icons) return
    document.body.insertAdjacentHTML('beforeend', icons)
  }

  flush() {
    if (!localStorage.available) return
    localStorage.flush(this.options.key)
  }
}
