import createEvents from '@/lib/events'
import debounce from 'lodash/debounce'

export const { on, once, off, emit } = createEvents()

window.addEventListener('resize', debounce(() => {
  emit('resize')
}, 150))
