import Dispatcher from '@core/dispatcher'

export default class {
  constructor() {
    this.dispatcher = new Dispatcher()

    this.init && this.init.apply(this, arguments)
  }

  on() {
    this.dispatcher.on(...arguments)
    return this
  }

  once() {
    this.dispatcher.once(...arguments)
    return this
  }

  off() {
    this.dispatcher.off(...arguments)
    return this
  }

  emit() {
    this.dispatcher.emit(...arguments)
    return this
  }

  destroy() {
    this.dispatcher.destroy()
  }
}
