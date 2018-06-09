import { SNAKE_LENGTH } from './config';
import { Point2D } from './models';

export function initSnake(){
  const snake: Array<Point2D> = [];

  for (let i = SNAKE_LENGTH - 1; i >= 0; i--) {
    snake.push({ x: i, y: 0 });
  }

  return snake;
}

export function move(snake, { direction, snakeLength }) {
  let nx = snake[0].x;
  let ny = snake[0].y;

  nx += 1 * direction.x;
  ny += 1 * direction.y;

  let tail;

  if (snakeLength > snake.length) {
    tail = { x: nx, y: ny };
  } else {
    tail = snake.pop();
    tail.x = nx;
    tail.y = ny;
  }

  snake.unshift(tail);

  return snake;
}
