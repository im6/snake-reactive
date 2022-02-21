import "./style.less";
import { snake$ } from "./observables";
import { renderBackground, drawSnake, prepareCanvasSize } from "./helper";

const canvasElem = document.getElementById("appCan") as HTMLCanvasElement;
const ctx = canvasElem.getContext("2d");
prepareCanvasSize(canvasElem);

snake$.subscribe((v) => {
  renderBackground(ctx);
  drawSnake(ctx, v);
});
