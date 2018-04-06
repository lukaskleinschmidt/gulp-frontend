import Breakpoint from 'modules/breakpoint'

const breakpoint = new Breakpoint('(min-width: 800px)')

breakpoint.on('match', () => {
  console.log('match')
})

breakpoint.on('unmatch', () => {
  console.log('unmatch')
})

breakpoint.check()
