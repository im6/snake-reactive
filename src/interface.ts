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
  [key: string]: Point2D;
}
