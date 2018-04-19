import Dispatcher from 'modules/dispatcher'

export default class Module {
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
