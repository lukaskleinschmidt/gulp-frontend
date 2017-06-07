import Breakpoint from './components/breakpoint';
import Model from './components/model';

const breakpoint = new Breakpoint('(min-width: 800px)');

breakpoint.on('match', () => {
  console.log('match');
}).check();

breakpoint.on('unmatch', () => {
  console.log('unmatch');
});
