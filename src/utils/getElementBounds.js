//@flow
import {type Bounds} from '../types';

export default function getElementBounds(element: ?HTMLElement): ?Bounds {
  if (!element) {
    return undefined;
  }
  const rect = element.getBoundingClientRect();
  return {
    left: window.pageXOffset + rect.left,
    right: window.pageXOffset + rect.left + rect.width,
    top: window.pageYOffset + rect.top,
    bottom: window.pageYOffset + rect.top + rect.height
  };
}
