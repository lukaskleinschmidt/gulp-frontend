export default class Dispatcher {
  constructor() {
    this._observers = {}
  }

  registerListener(event, listener, options = {}) {
    (this._observers[event] || (this._observers[event] = [])).push({
      listener: listener,
      once: options.once || false
    })
  }

  on(event, listener) {
    this.registerListener(event, listener)
  }

  once(event, listener) {
    this.registerListener(event, listener, {
      once: true
    })
  }

  emit(event, data) {
    let key, value
    for (value = this._observers[event], key = 0; value && key < value.length;) {
      const o = value[key++]
      o.listener.apply(this, data)
      o.once && this.off(event, o.listener)
    }
  }

  off(event, listener) {
    let key, value
    for (value = this._observers[event] || []; listener && (key = value.findIndex(o => o.listener === listener)) > -1;) {
      value.splice(key, 1)
    }
    this._observers[event] = listener ? value : []
  }

  destroy() {
    this._observers = {}
  }
}
