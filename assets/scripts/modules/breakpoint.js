import Module from 'module'

export default class Breakpoint extends Module {
  init(mediaQueryString) {
    const mql = window.matchMedia(mediaQueryString)
    const listener = () => this.trigger(mql.matches ? 'match' : 'unmatch', [mql])

    mql.addListener(listener)

    this.set('mql', mql)
    this.set('listener', listener)
  }

  check() {
    this.get('listener').call()

    //return this for chaining
    return this
  }

  destroy() {
    const mql = this.get('mql')
    const listener = this.get('listener')

    mql.removeListener(listener)

    super.destroy()
  }
}
