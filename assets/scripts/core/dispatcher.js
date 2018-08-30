export default class {
  constructor() {
    this._observers = {}
  }

  register(event, listener, options = {}) {
    (this._observers[event] || (this._observers[event] = [])).push({
      listener: listener,
      once: options.once || false
    })
  }

  on(event, listener) {
    this.register(event, listener)
  }

  once(event, listener) {
    this.register(event, listener, {
      once: true
    })
  }

  emit(event, data) {
    let i, value
    for (value = this._observers[event], i = 0; value && i < value.length;) {
      const o = value[i++]
      o.listener.apply(this, data)
      o.once && this.off(event, o.listener)
    }
  }

  off(event, listener) {
    let i, value
    for (value = this._observers[event] || []; listener && (i = value.findIndex(o => o.listener === listener)) > -1;) {
      value.splice(i, 1)
    }
    this._observers[event] = listener ? value : []
  }

  destroy() {
    this._observers = {}
  }
}
