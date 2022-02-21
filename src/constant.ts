import { Directions } from "./interface";

export const DIRECTIONS: Directions = {
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
};
export const INITIAL_DIRECTION = { x: 1, y: 0 };
export const SNAKE_LENGTH = 4;
