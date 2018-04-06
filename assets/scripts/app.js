import Breakpoint from './components/breakpoint'
import Component from './components/component'

const breakpoint = new Breakpoint('(min-width: 800px)')

breakpoint.on('match', () => {
  console.log('match')
})

breakpoint.on('unmatch', () => {
  console.log('unmatch')
})

breakpoint.check()
