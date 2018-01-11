//@flow
import {type Bounds} from '../types';

export default function (elementBounds: Bounds, viewportBounds: Bounds, offset?: Bounds): boolean {
  const offsetTop = offset && offset.top || 0;
  const offsetRight = offset && offset.right || 0;
  const offsetBottom = offset && offset.bottom || 0;
  const offsetLeft = offset && offset.left || 0;
  return (
    elementBounds.bottom + offsetBottom >= viewportBounds.top  && elementBounds.top - offsetTop <= viewportBounds.bottom  &&
    elementBounds.right + offsetRight >= viewportBounds.left &&  elementBounds.left - offsetLeft <= viewportBounds.right
  );

}