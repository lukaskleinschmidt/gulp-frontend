import { breakpoint, breakpointUntil, breakpointBetween } from '@/app/breakpoints'
import cssContent from '@/lib/css-content'
import icons from '@/lib/icons'


// load an cache icon sprite
const url = '/assets/icons/sprite.svg'
const ttl = process.env.NODE_ENV === 'production' ? 1000 * 60 * 60 * 24 : 0

icons(url, ttl)


// listen to css defined breakpoints
breakpoint('medium', (matches, mql) => {
  console.log('breakpoint', mql.media, matches)
})

breakpointUntil('medium', (matches, mql) => {
  console.log('breakpoint-until', mql.media,  matches)
})

breakpointBetween('medium', 'large', (matches, mql) => {
  console.log('breakpoint-between', mql.media, matches)
})


// parse computed property of a pseudo element
const { plain, json } = cssContent.parse('#css-content', 'after')

console.log('plain()', plain())
console.log('json()', json())


// watch computed property of a pseudo element
const watcher = cssContent.watch('#css-content', 'after')

watcher.onChange(data => {
  console.log('watcher', data)
})
