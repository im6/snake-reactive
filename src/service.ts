
import { Scene, Point2D } from './models';
import {
  CELL_SIZE, GAP_SIZE, CANVAS_HEIGHT, CANVAS_WIDTH, APPLE_COLOR,
  SNAKE_BODY_COLOR, SNAKE_HEAD_COLOR, COLS, ROWS, APPLE_COUNT, SNAKE_LENGTH,
} from './config';

// canvas operation

function renderBackground(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#EEE';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function paintCell(ctx: CanvasRenderingContext2D, point: Point2D, color: string) {
  const x = point.x * CELL_SIZE + (point.x * GAP_SIZE);
  const y = point.y * CELL_SIZE + (point.y * GAP_SIZE);

  ctx.fillStyle = color;
  ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
}

function getSnakeCellColor(index: number) {
  return index === 0 ? SNAKE_HEAD_COLOR : SNAKE_BODY_COLOR;
}

// snake movement

function wrapBounds(point: Point2D) {
  point.x = point.x >= COLS ? 0 : point.x < 0 ? COLS - 1 : point.x;
  point.y = point.y >= ROWS ? 0 : point.y < 0 ? ROWS - 1 : point.y;

  return point;
}

function checkCollision(a, b) {
  return a.x === b.x && a.y === b.y;
}

function isEmptyCell(position: Point2D, snake: Point2D[]): boolean {
  return !snake.some(segment => checkCollision(segment, position));
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomPosition(snake: Point2D[] = []): Point2D {
  const position = {
    x: getRandomNumber(0, COLS - 1),
    y: getRandomNumber(0, ROWS - 1),
  };

  return isEmptyCell(position, snake) ? position : getRandomPosition(snake);
}


// ======================================
// ==========  export  ==================
// ======================================

export function createCanvasElem() {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  return canvas;
}

export function renderScene(ctx: CanvasRenderingContext2D, scene?: Scene) {
  renderBackground(ctx);
}

export function renderApples(ctx: CanvasRenderingContext2D, apples: Point2D[]) {
  apples.forEach(apple => paintCell(ctx, apple, APPLE_COLOR));
}

export function renderSnake(ctx: CanvasRenderingContext2D, snake: Point2D[]) {
  snake.forEach((segment, index) => paintCell(ctx, wrapBounds(segment), getSnakeCellColor(index)));
}

export function nextDirection(previous, next) {
  const isOpposite = (previous: Point2D, next: Point2D) => {
    return next.x === previous.x * -1 || next.y === previous.y * -1;
  };

  if (isOpposite(previous, next)) {
    return previous;
  }

  return next;
}

export function initSnake() {
  const snake: Point2D[] = [];

  for (let i = SNAKE_LENGTH - 1; i >= 0; i -= 1) {
    snake.push({ x: i, y: 0 });
  }

  return snake;
}

export function initApples(): Point2D[] {
  const apples = [];

  for (let i = 0; i < APPLE_COUNT; i += 1) {
    apples.push(getRandomPosition());
  }

  return apples;
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

export function eat(apples: Point2D[], snake) {
  const head = snake[0];

  for (let i = 0; i < apples.length; i += 1) {
    if (checkCollision(apples[i], head)) {
      apples.splice(i, 1);
      return [...apples, getRandomPosition(snake)];
    }
  }

  return apples;
}


