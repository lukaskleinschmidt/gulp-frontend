import set from 'lodash/set'
import get from 'lodash/get'
import has from 'lodash/has'

export default class Component {
  constructor() {
    this._data = {}
    this._observers = {}
    this.init && this.init.apply(this, arguments)
  }

  set(path, value) {
    set(this._data, path, value)
    return value
  }

  get(path, defaultValue) {
    return get(this._data, path, defaultValue)
  }

  has(path) {
    return has(this._data, path)
  }

  on(event, listener) {
    // push listerner to list of observers
    (this._observers[event] || (this._observers[event] = [])).push(listener)

    //return this for chaining
    return this
  }

  trigger(event, data) {
    // cycle through all listerners for a given event
    for (let value = this._observers[event], key = 0; value && key < value.length;) {
      // call listener and pass data
      value[key++].apply(this, data)
    }

    //return this for chaining
    return this
  }

  off(event, listener) {
    // get index of the given listener
    for (let value = this._observers[event] || []; listener && (key = value.indexOf(listener)) > -1;) {
      // remove the listener
      value.splice(key, 1)
    }

    // assign the new list
    this._observers[event] = listener ? value : []

    // return this for chaining
    return this
  }

  destroy() {
    delete this._data
    delete this._observers
  }
}
