import createEvents from '@/lib/events'

export default function createBreakpoint(mediaQuery, fn) {
  const { on, once, off, emit } = createEvents();
  const mql = window.matchMedia(mediaQuery);

  mql.addListener(listener);

  if (typeof fn === 'function') {
    onChange(fn);
  }

  function listener() {
    emit(mql.matches ? 'match' : 'unmatch', mql.matches, mql);
    emit('change', mql.matches, mql);
  }

  function call(fn, ...args) {
    fn.apply(null, args);
  }

  function onChange(fn) {
    call(fn, mql.matches, mql);
    on('change', fn);
  }

  function onMatch(fn) {
    if (mql.matches) call(fn, mql);
    on('match', fn);
  }

  function onUnmatch(fn) {
    if (!mql.matches) call(fn, mql);
    on('unmatch', fn);
  }

  function check() {
    listener.call();
  }

  function destroy() {
    mql.removeListener(listener);
    off();
  }

  return {
    onChange,
    onMatch,
    onUnmatch,
    on,
    once,
    off,
    check,
    destroy,
  }
}
