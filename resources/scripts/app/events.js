import createEvents from '@/lib/events';
import debounce from 'lodash/debounce';

export const { on, once, off, emit } = createEvents();

let innerHeight = window.innerHeight;
let innerWidth = window.innerWidth;

window.addEventListener('resize', debounce(event => {
  emit('resize', event);

  const currentHeight = window.innerHeight;
  const currentWidth = window.innerWidth;

  if (innerHeight !== currentHeight) {
    innerHeight = currentHeight;
    emit('resize.y', event);
  }

  if (innerWidth !== currentWidth) {
    innerHeight = currentWidth;
    emit('resize.x', event);
  }
}, 150));
