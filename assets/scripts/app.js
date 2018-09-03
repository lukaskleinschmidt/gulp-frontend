import Breakpoint from '@modules/breakpoint'
import Icons from '@modules/icons'

const breakpoint = new Breakpoint('(min-width: 800px)')

breakpoint.on('match', () => {
  console.log('match')
})

breakpoint.on('unmatch', () => {
  console.log('unmatch')
})

breakpoint.check()

const url = '/assets/icons/sprite.svg'
const ttl = process.env.NODE_ENV === 'production' ? 1000 * 60 * 60 * 24 : 0 // 24h

const icons = new Icons(url, ttl)

// flush cache if necessary
icons.flush()
