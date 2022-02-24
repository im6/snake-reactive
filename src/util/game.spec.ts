import { Point2D } from "../interface";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../constant";
import {
  createApple,
  nextDirection,
  initializeSnake,
  move,
  isGameOver,
  auditApplePosition,
} from "./game";

let snake: Point2D[] = null;

describe("game utility tests", () => {
  beforeAll(() => {
    snake = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ];
  });
  test("createApple", () => {
    const apple = createApple();
    expect(apple.x).toBeLessThan(CANVAS_WIDTH);
    expect(apple.y).toBeLessThan(CANVAS_HEIGHT);
  });

  test("createApple", () => {
    const apple = createApple();
    expect(apple.x).toBeLessThan(CANVAS_WIDTH);
    expect(apple.y).toBeLessThan(CANVAS_HEIGHT);
  });

  test("nextDirection", () => {
    const d0 = { x: 1, y: 0 };
    const d1 = { x: 1, y: 1 };
    expect(nextDirection(d0, d1)).toBe(d1);
  });

  test("initializeSnake", () => {
    const testLen = 2;
    expect(initializeSnake(testLen)).toHaveLength(testLen);
  });

  test("move", () => {
    const dir = [{ x: 1, y: 1 }, 2];
    expect(move(snake, dir)).toEqual([
      { x: 1, y: 1 },
      { x: 0, y: 0 },
    ]);
  });

  test("auditApplePosition", () => {
    const apple = { x: 1, y: 3 };
    expect(auditApplePosition(apple, snake)).toBe(apple);
  });

  test("isGameOver, hit wall", () => {
    const scene = [snake];
    expect(isGameOver(scene)).toBeTruthy();
  });

  test("isGameOver, hit body", () => {
    const scene = [
      [
        { x: 3, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 0 },
        { x: 3, y: 0 },
      ],
    ];
    expect(isGameOver(scene)).toBeFalsy();
  });
});
