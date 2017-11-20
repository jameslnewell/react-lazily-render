//@flow
import {type Bounds} from '../types';

export default function (elementBounds: Bounds, viewportBounds: Bounds): boolean {
  return (
    elementBounds.bottom >= viewportBounds.top  && elementBounds.top <= viewportBounds.bottom  &&
    elementBounds.right >= viewportBounds.left &&  elementBounds.left <= viewportBounds.right
  );
}