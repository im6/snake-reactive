import { Directions } from "./interface";

export const DIRECTIONS: Directions = {
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
};
export const INITIAL_DIRECTION = { x: 1, y: 0 };
export const SNAKE_LENGTH = 4;
export const BOX_SIZE = 15;
export const SNAKE_HEAD_COLOR = "#3f72af";
export const SNAKE_BODY_COLOR = "#c7d0d5";
export const CANVAS_WIDTH = 20; // not actual pixel, but number of box width
export const CANVAS_HEIGHT = 20; // same as above
