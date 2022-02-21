import "./style.less";
import { game$ } from "./observables";
import {
  drawBackground,
  drawSnake,
  drawApple,
  drawScore,
  prepareCanvasSize,
  renderGameOver,
} from "./util/canvas";
import { SNAKE_LENGTH } from "./constant";

const canvasElem = document.getElementById("appCan") as HTMLCanvasElement;
const ctx = canvasElem.getContext("2d");
prepareCanvasSize(canvasElem);

game$.subscribe({
  next: (scene) => {
    const [snake, apple] = scene;
    drawBackground(ctx);
    drawScore(ctx, snake.length - SNAKE_LENGTH);
    drawSnake(ctx, snake);
    drawApple(ctx, apple);
  },
  complete: () => renderGameOver(ctx),
});
