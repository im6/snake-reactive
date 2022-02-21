import { Point2D } from "./interface";

const isOpposite = (d0: Point2D, d1: Point2D) => {
  return d0.x === d1.x * -1 || d0.y === d1.y * -1;
};
export const nextDirection = (acc: Point2D, cur: Point2D) =>
  isOpposite(acc, cur) ? acc : cur;
