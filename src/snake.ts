import { SNAKE_LENGTH } from './config';
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

export function initSnake(){
  const snake: Array<Point2D> = [];

  for (let i = SNAKE_LENGTH - 1; i >= 0; i--) {
    snake.push({ x: i, y: 0 });
  }

  return snake;
}

export function move(snake, { direction, snakeLength }) {
  if (snakeLength === snake.length) {
    snake.pop();
  }

  const nx = snake[0].x + 1 * direction.x;
  const ny = snake[0].y + 1 * direction.y;
  const nextBox = { x: nx, y: ny };
  snake.unshift(nextBox);

  return snake;
}
