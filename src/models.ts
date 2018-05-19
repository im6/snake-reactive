export interface Point2D {
  x: number;
  y: number;
}

export interface Scene {
  snake: Array<Point2D>;
  apples: Array<Point2D>;
  score: number;
}

export interface Directions {
  [key: number]: Point2D;
}

export const DIRECTIONS: Directions = {
  65: { x: -1, y: 0 }, // a
  68: { x: 1, y: 0 },  // d
  87: { x: 0, y: -1 }, // w
  83: { x: 0, y: 1 }   // s
};