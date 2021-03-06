import createBreakpoint from '@/lib/breakpoint';
import config from '@/app/config';

const breakpoints = {
  ...config.breakpoints,
  // Define additional named breakpoints here
}

function respondTo(min, max, fn, mediaType = 'all') {
  min = breakpoints[min] || null;
  max = breakpoints[max] || null;

  let mediaQuery = '';

  if (min) mediaQuery += ' and (min-width: ' + min + 'em)';
  if (max) mediaQuery += ' and (max-width: ' + (max - 0.01) + 'em)';

  if (mediaType === 'all' && mediaQuery) {
    mediaQuery = mediaQuery.slice(5);
    mediaType = '';
  }

  return createBreakpoint(mediaType + mediaQuery, fn);
}

export function breakpoint(min, fn, mediaType = 'all') {
  return respondTo(min, 0, fn, mediaType);
}

export function breakpointUntil(max, fn, mediaType = 'all') {
  return respondTo(0, max, fn, mediaType);
}

export function breakpointBetween(min, max, fn, mediaType = 'all') {
  return respondTo(min, max, fn, mediaType);
}
