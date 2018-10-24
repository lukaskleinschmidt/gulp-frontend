export const createEvents = () => {
  let events = Object.create(null)

  function on(event, fn) {
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        on(event[i], fn)
      }
    } else {
      (events[event] || (events[event] = [])).push(fn)
    }
  }

  function once(event, fn) {
    function once() {
      fn.apply(this, arguments)
      off(event, once)
    }
    once.fn = fn
    on(event, once)
  }

  function emit(event, ...args) {
    let cbs = events[event]

    if (cbs) {
      cbs = cbs.length > 1 ? [...cbs] : cbs
      for (let i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(this, args)
      }
    }
  }

  function off(event, fn) {
    // all events
    if (!arguments.length) {
      events = Object.create(null)
    }

    // array of events
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        off(event[i], fn)
      }
    }

    // specific event
    const cbs = events[event]

    if (!cbs) {
      return
    }

    if (!fn) {
      events[event] = null
    }

    // specific handler
    if (fn) {
      let cb
      let i = cbs.length
      while (i--) {
        cb = cbs[i]
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1)
          break
        }
      }
    }
  }

  return {
    on,
    once,
    emit,
    off
  }
}

export default createEvents
