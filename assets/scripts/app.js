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
const ttl = process.env.NODE_ENV === 'production' ? 300000 : 0 // default: 300000 (5 minutes)
const key = 'default-icons' // default: 'icons'

const icons = new Icons(url, key, ttl)

// flush cache if necessary
icons.flush()
