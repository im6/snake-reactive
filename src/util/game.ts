import { Point2D } from "../interface";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../constant";

const detectCollision = (n1: Point2D, n2: Point2D) =>
  n1.x === n2.x && n1.y === n2.y;
const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const isOpposite = (d0: Point2D, d1: Point2D): boolean => {
  return d0.x === d1.x * -1 || d0.y === d1.y * -1;
};

const checkHeadHitBody = (head: Point2D, body: Point2D[]) => {
  let willHit = false;
  for (let i = 3; i < body.length; i += 1) {
    // head cannot hit index in [0,1,2]
    if (detectCollision(head, body[i])) {
      willHit = true;
    }
  }
  return willHit;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const createApple = (): Point2D => ({
  x: getRandomNumber(0, CANVAS_WIDTH - 1),
  y: getRandomNumber(0, CANVAS_HEIGHT - 1),
});

export const auditApplePosition = (
  apple: Point2D,
  snake: Point2D[]
): Point2D => {
  let overlap = false;
  snake.forEach((v) => {
    if (detectCollision(v, apple)) {
      overlap = true;
    }
  });
  return overlap ? createApple() : apple;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGameOver = (scene: any): boolean => {
  const snake = scene[0];
  const head = snake[0];
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x > CANVAS_WIDTH - 1 ||
    head.y > CANVAS_HEIGHT - 1
  ) {
    return false;
  }
  if (checkHeadHitBody(head, snake)) {
    return false;
  }
  return true;
};
