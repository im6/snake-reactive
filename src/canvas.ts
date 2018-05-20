import { Scene } from './models';
import {
  CELL_SIZE, GAP_SIZE, CANVAS_HEIGHT, CANVAS_WIDTH, APPLE_COLOR,
  SNAKE_BODY_COLOR, SNAKE_HEAD_COLOR, COLS, ROWS,
} from './config';
import { Point2D } from './models';

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

function getSnakeCellColor(index: number){
  return index === 0 ? SNAKE_HEAD_COLOR : SNAKE_BODY_COLOR;
}

function wrapBounds(point: Point2D) {
  point.x = point.x >= COLS ? 0 : point.x < 0 ? COLS - 1 : point.x;
  point.y = point.y >= ROWS ? 0 : point.y < 0 ? ROWS - 1 : point.y;

  return point;
}

// ==========  export  ==================

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

export function renderSnake(ctx: CanvasRenderingContext2D, snake: Array<Point2D>) {
  snake.forEach((segment, index) => paintCell(ctx, wrapBounds(segment), getSnakeCellColor(index)));
}