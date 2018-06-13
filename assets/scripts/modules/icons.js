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
      const request = new XMLHttpRequest()

      request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
          if (localStorage.available) {
            localStorage.setItem(this.options.key, request.responseText, this.options.ttl)
          }

          this.insert(request.responseText)
        }
      }

      request.open('GET', url, true)
      request.send(null)
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
