//@flow
import {type Bounds} from '../types';

export default function(offset?: number | {top?: number, right?: number, bottom?: number, left?: number}): ?Bounds {

  if (!offset) {
    return undefined;
  }

  let offsetTop;
  let offsetRight;
  let offsetBottom;
  let offsetLeft;

  if (typeof offset === 'object') {
    offsetTop = offset.top || 0;
    offsetRight = offset.right || 0;
    offsetBottom = offset.bottom || 0;
    offsetLeft = offset.left || 0;
  } else {
    offsetTop = offset || 0;
    offsetRight = offset || 0;
    offsetBottom = offset || 0;
    offsetLeft = offset || 0;
  }

  return {
    top: offsetTop,
    right: offsetRight,
    bottom: offsetBottom,
    left: offsetLeft
  };

}