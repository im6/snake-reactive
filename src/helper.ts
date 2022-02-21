import { Point2D } from "./interface";
import {
  BOX_SIZE,
  SNAKE_HEAD_COLOR,
  SNAKE_BODY_COLOR,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from "./constant";

const isOpposite = (d0: Point2D, d1: Point2D): boolean => {
  return d0.x === d1.x * -1 || d0.y === d1.y * -1;
};
export const nextDirection = (acc: Point2D, cur: Point2D): Point2D =>
  isOpposite(acc, cur) ? acc : cur;

export const initializeSnake = (initLen: number): Point2D[] => {
  const snake: Array<Point2D> = [];
  for (let i = initLen - 1; i >= 0; i--) {
    snake.push({ x: i, y: 0 });
  }
  return snake;
};

export const move = (acc: Point2D[], cur: any): Point2D[] => {
  const [direction, snakeLen] = cur;
  const dir = direction as Point2D;
  const newHead = {
    x: acc[0].x + dir.x,
    y: acc[0].y + dir.y,
  };
  const newSnake = [newHead, ...acc];
  if (snakeLen < newSnake.length) {
    newSnake.pop();
  }
  return newSnake;
};

const drawBox = (
  ctx: CanvasRenderingContext2D,
  point: Point2D,
  color: string
) => {
  ctx.fillStyle = color;
  ctx.fillRect(point.x * BOX_SIZE, point.y * BOX_SIZE, BOX_SIZE, BOX_SIZE);
};
const getSnakeBoxColor = (idx: number) =>
  idx === 0 ? SNAKE_HEAD_COLOR : SNAKE_BODY_COLOR;

export const prepareCanvasSize = (canvasElem: HTMLCanvasElement) => {
  const canvasWidth = CANVAS_WIDTH * BOX_SIZE;
  const canvasHeight = CANVAS_HEIGHT * BOX_SIZE;
  canvasElem.width = canvasWidth;
  canvasElem.height = canvasHeight;
};

export const renderBackground = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "#EEE";
  ctx.fillRect(0, 0, CANVAS_WIDTH * BOX_SIZE, CANVAS_HEIGHT * BOX_SIZE);
};
export const drawSnake = (ctx: CanvasRenderingContext2D, snake: Point2D[]) => {
  snake.forEach((v, k) => {
    drawBox(ctx, v, getSnakeBoxColor(k));
  });
};
