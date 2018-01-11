
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

// using this hack instead of `import 'raf/polyfill';` because the polyfill keeps a global queue
// which breaks across tests using Jest fake timers
global.requestAnimationFrame = callback => setTimeout(callback, 16);
