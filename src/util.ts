import { Scene, Point2D } from './models';

export function nextDirection(previous, next) {
  const isOpposite = (previous: Point2D, next: Point2D) => {
    return next.x === previous.x * -1 || next.y === previous.y * -1;
  };

  if (isOpposite(previous, next)) {
    return previous;
  }

  return next;
}
