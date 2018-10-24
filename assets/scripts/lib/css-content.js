import { on as addEventListener, off as removeEventListener } from '@/app/events'
import createEvents from '@/lib/events'
import isEqual from 'lodash/isEqual'

export const createContentParser = (element, pseudoElement = 'after') => {
  if (typeof element === 'string') {
    element = document.querySelector(element)
  }

  function plain() {
    try {
      const content = getComputedStyle(element, ':' + pseudoElement).content
      return JSON.parse(content)
    } catch (e) {
      return null
    }
  }

  function json() {
    try {
      return JSON.parse(plain())
    } catch (e) {
      return null
    }
  }

  return {
    plain,
    json
  }
}

export const makeCreateContentWatcher = (createContentParser, createEvents) => (element, pseudoElement = 'after') => {
  const { json } = createContentParser(element, pseudoElement)
  const { on, once, off, emit } = createEvents()

  let data = json()

  addEventListener('resize', listener)

  function listener() {
    if (isEqual(data, json())) return
    emit('change', data = json())
  }

  function call(fn, ...args) {
    fn.apply(this, args)
  }

  function onChange(fn) {
    call(fn, data)
    on('change', fn)
  }

  function check() {
    listener.call()
  }

  function destroy() {
    removeEventListener('resize', onResize)
  }

  return {
    onChange,
    on,
    once,
    off,
    emit,
    check,
    destroy
  }
}

export default {
  parse: createContentParser,
  watch: makeCreateContentWatcher(createContentParser, createEvents)
}
