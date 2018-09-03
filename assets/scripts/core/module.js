import Dispatcher from '@core/dispatcher'

export default class {
  constructor() {
    this._dispatcher = new Dispatcher()

    this.init && this.init.apply(this, arguments)
  }

  on() {
    this._dispatcher.on(...arguments)
    return this
  }

  once() {
    this._dispatcher.once(...arguments)
    return this
  }

  off() {
    this._dispatcher.off(...arguments)
    return this
  }

  emit() {
    this._dispatcher.emit(...arguments)
    return this
  }

  destroy() {
    this._dispatcher.destroy()
  }
}
