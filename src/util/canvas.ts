import { Point2D } from "../interface";
import {
  BOX_SIZE,
  SNAKE_HEAD_COLOR,
  SNAKE_BODY_COLOR,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  APPLE_COLOR,
} from "../constant";

const getSnakeBoxColor = (idx: number) =>
  idx === 0 ? SNAKE_HEAD_COLOR : SNAKE_BODY_COLOR;
const drawBox = (
  ctx: CanvasRenderingContext2D,
  point: Point2D,
  color: string
) => {
  ctx.fillStyle = color;
  ctx.fillRect(point.x * BOX_SIZE, point.y * BOX_SIZE, BOX_SIZE, BOX_SIZE);
};
export const prepareCanvasSize = (canvasElem: HTMLCanvasElement) => {
  const canvasWidth = CANVAS_WIDTH * BOX_SIZE;
  const canvasHeight = CANVAS_HEIGHT * BOX_SIZE;
  canvasElem.width = canvasWidth;
  canvasElem.height = canvasHeight;
};
export const drawBackground = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "#EEE";
  ctx.fillRect(0, 0, CANVAS_WIDTH * BOX_SIZE, CANVAS_HEIGHT * BOX_SIZE);
};
export const drawSnake = (ctx: CanvasRenderingContext2D, snake: Point2D[]) => {
  snake.forEach((v, k) => {
    drawBox(ctx, v, getSnakeBoxColor(k));
  });
};
export const drawApple = (ctx: CanvasRenderingContext2D, apple: Point2D) => {
  drawBox(ctx, apple, APPLE_COLOR);
};

export const drawScore = (ctx: CanvasRenderingContext2D, score: number) => {
  ctx.font = `bold 80px sans-serif`;
  ctx.fillStyle = "#d9d9d9";

  let textX = (CANVAS_WIDTH * BOX_SIZE) / 2;
  let textY = (CANVAS_HEIGHT * BOX_SIZE) / 2;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(score.toString(), textX, textY);
};

export const renderGameOver = (ctx: CanvasRenderingContext2D) => {
  ctx.font = `bold 15px sans-serif`;
  ctx.fillStyle = "black";

  let textX = (CANVAS_WIDTH * BOX_SIZE) / 2;
  let textY = ((CANVAS_HEIGHT * BOX_SIZE) / 2) * 0.6;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText("Game Over", textX, textY);
};
