import Module from 'module'

export default class Breakpoint extends Module {
  init(mediaQueryString) {
    this.mql = window.matchMedia(mediaQueryString)
    this.listener = () => this.emit(this.mql.matches ? 'match' : 'unmatch', [this.mql])
    this.mql.addListener(this.listener)
  }

  check() {
    this.listener.call()
    return this
  }

  destroy() {
    this.mql.removeListener(this.listener)
  }
}
