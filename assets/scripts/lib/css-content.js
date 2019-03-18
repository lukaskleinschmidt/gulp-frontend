import * as appEvents from '@/app/events';
import createEvents from '@/lib/events';
import isEqual from 'lodash/isEqual';

export function createCssContentParser(element, pseudoElement = 'after') {
  if (typeof element === 'string') {
    element = document.querySelector(element);
  }

  function value() {
    const content = getComputedStyle(element, ':' + pseudoElement).content;

    try {
      return JSON.parse(content);
    } catch (e) {

      // because edge does not escape quotes correctly
      if (typeof content === 'string') {
        return content.slice(1, -1);
      }

      return null;
    }
  }

  function json() {
    try {
      return JSON.parse(value());
    } catch (e) {
      return null;
    }
  }

  return {
    value,
    json,
  }
}

export function createCssContentWatcher(element, pseudoElement = 'after') {
  const { json } = createCssContentParser(element, pseudoElement);
  const { on, once, off, emit } = createEvents();

  let data = json();

  appEvents.on('resize', listener);

  function listener() {
    if (isEqual(data, json())) return;
    emit('change', data = json());
  }

  function call(fn, ...args) {
    fn.apply(null, args);
  }

  function onChange(fn) {
    call(fn, data);
    on('change', fn);
  }

  function check() {
    listener.call();
  }

  function destroy() {
    appEvents.off('resize', listener);
  }

  return {
    onChange,
    on,
    once,
    off,
    check,
    destroy,
  }
}

export default {
  parse: createCssContentParser,
  watch: createCssContentWatcher,
}
