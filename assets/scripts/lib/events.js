// example using a third-party event emitter;
// import EventEmitter from 'eventemitter3';
//
// export default function createEvents() {
//   const events = new EventEmitter();
//   const { on, once, emit, off, removeAllListeners } = events;
//
//   return {
//     events: events,
//     on: on.bind(events),
//     once: once.bind(events),
//     emit: emit.bind(events),
//     off: function () {
//       if (arguments.length) return off.apply(events, arguments);
//       return removeAllListeners.apply(events, arguments);
//     }
//   }
// }

// example using a third-party event emitter and proxy
// import EventEmitter from 'eventemitter3';
//
// export default function createEvents() {
//   const events = new EventEmitter();
//
//   function off() {
//     if (arguments.length) return events.off.apply(events, arguments);
//     return events.removeAllListeners.apply(events, arguments);
//   }
//
//   return new Proxy(events, {
//     get: function (target, prop) {
//       if (prop == 'off') return off;
//       return target[prop].bind(events);
//     }
//   })
// }

export default function createEvents() {
  let events = Object.create(null);

  function on(event, fn) {
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        on(event[i], fn);
      }
    } else {
      (events[event] || (events[event] = [])).push(fn);
    }
  }

  function once(event, fn) {
    function once() {
      fn.apply(null, arguments);
      off(event, once);
    }
    once.fn = fn;
    on(event, once);
  }

  function emit(event, ...args) {
    let cbs = events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? [...cbs] : cbs;
      for (let i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(null, args);
      }
    }
  }

  function off(event, fn) {
    // all events
    if (!arguments.length) {
      events = Object.create(null);
    }

    // array of events
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        off(event[i], fn);
      }
    }

    // specific event
    const cbs = events[event];

    if (!cbs) {
      return;
    }

    if (!fn) {
      events[event] = null;
    }

    // specific handler
    if (fn) {
      let cb;
      let i = cbs.length;
      while (i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1);
          break;
        }
      }
    }
  }

  return {
    on,
    once,
    emit,
    off,
  }
}
