//@flow
import {type Bounds, type Window} from '../types';
import getElementBounds from './getElementBounds';

export default function(container: ?HTMLElement | ?Window): ?Bounds {
  if (!container) {
    return undefined;
  }
  if (container === window) {
    return {
      top: window.pageYOffset,
      left: window.pageXOffset,
      bottom: window.pageYOffset + window.innerHeight,
      right: window.pageXOffset + window.innerWidth
    };
  } else {
    const bounds = getElementBounds(container);
    if (bounds) {
      return {
        ...bounds,
        bottom: bounds.top + container.offsetHeight,
        right: bounds.left + container.offsetWidth
      };
    } else {
      return undefined;
    }
  }
}