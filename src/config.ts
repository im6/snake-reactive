import { Directions } from './models';

export const COLS = 30;
export const ROWS = 30;
export const GAP_SIZE = 1;
export const CELL_SIZE = 10;
export const CANVAS_WIDTH = COLS * (CELL_SIZE + GAP_SIZE);
export const CANVAS_HEIGHT = ROWS * (CELL_SIZE + GAP_SIZE);
export const DIRECTIONS: Directions = {
  65: { x: -1, y: 0 }, // a
  68: { x: 1, y: 0 },  // d
  87: { x: 0, y: -1 }, // w
  83: { x: 0, y: 1 }   // s
};
export const APPLE_COLOR = "#eb5e5e";
export const SNAKE_HEAD_COLOR = "#000";
export const SNAKE_BODY_COLOR = "#5dd9aa";