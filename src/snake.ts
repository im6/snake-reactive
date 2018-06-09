

export function move(snake, direction, snakeLength) {
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
