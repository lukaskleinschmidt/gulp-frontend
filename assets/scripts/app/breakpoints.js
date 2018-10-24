import createBreakpoint from '@/lib/breakpoint'
import { cssConfig } from '@/app/config'

function respondTo(min, max, fn, mediaType = 'all') {
  min = cssConfig.breakpoint[min] || null
  max = cssConfig.breakpoint[max] || null

  let mediaQuery = ''

  if (min) mediaQuery += ' and (min-width: ' + min + 'em)'
  if (max) mediaQuery += ' and (max-width: ' + (max - 0.01) + 'em)'

  if (mediaType === 'all' && mediaQuery) {
    mediaQuery = mediaQuery.slice(5)
    mediaType = ''
  }

  return createBreakpoint(mediaType + mediaQuery, fn)
}

export function breakpoint(min, fn, mediaType = 'all') {
  return respondTo(min, 0, fn, mediaType)
}

export function breakpointUntil(max, fn, mediaType = 'all') {
  return respondTo(0, max, fn, mediaType)
}

export function breakpointBetween(min, max, fn, mediaType = 'all') {
  return respondTo(min, max, fn, mediaType)
}
