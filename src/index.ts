import "./style.less";
import { game$ } from "./observables";
import CanvasUtil from "./util/canvas";
import { SNAKE_LENGTH } from "./constant";

const canvasElem = document.getElementById("appCan") as HTMLCanvasElement;
const canvasHelper = new CanvasUtil(canvasElem.getContext("2d"));
CanvasUtil.prepareCanvasSize(canvasElem);

game$.subscribe({
  next: (scene) => {
    const [snake, apple] = scene;
    canvasHelper.drawBackground();
    canvasHelper.drawScore(snake.length - SNAKE_LENGTH);
    canvasHelper.drawSnake(snake);
    canvasHelper.drawApple(apple);
  },
  complete: () => canvasHelper.renderGameOver(),
});
