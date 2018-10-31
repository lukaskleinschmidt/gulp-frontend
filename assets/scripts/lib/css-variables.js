import * as appEvents from '@/app/events'
import createEvents from '@/lib/events'

export function createCssVariables(element) {
  if (typeof element === 'string') {
    element = document.querySelector(element)
  }

  const style = window.getComputedStyle(element)

  function get(key) {
    return style.getPropertyValue(key)
  }

  function set(key, value) {
    element.style.setProperty(key, value)
    appEvents.emit('css-variables.set' + key, value)
  }

  function watch(key) {
    const { on, once, off, emit } = createEvents()

    let value = get(key)

    appEvents.on('css-variables.set' + key, listener)
    appEvents.on('resize', listener)

    function listener() {
      if (value === get(key)) return
      emit('change', value = get(key))
    }

    function call(fn, ...args) {
      fn.apply(this, args)
    }

    function onChange(fn) {
      call(fn, value)
      on('change', fn)
    }

    function check() {
      listener.call()
    }

    function destroy() {
      appEvents.off('css-variables.set' + key, listener)
      appEvents.off('resize', listener)
    }

    return {
      onChange,
      on,
      once,
      off,
      check,
      destroy
    }
  }

  return {
    watch,
    get,
    set
  }
}

export default {
  scope: createCssVariables,
  ...createCssVariables(document.body)
}
