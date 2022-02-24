import { Point2D } from "../interface";
import {
  BOX_SIZE,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  APPLE_COLOR,
  SNAKE_HEAD_COLOR,
  SNAKE_BODY_COLOR,
} from "../constant";

class CanvasUtil {
  private ctx: CanvasRenderingContext2D;
  private getSnakeBoxColor(idx: number) {
    return idx === 0 ? SNAKE_HEAD_COLOR : SNAKE_BODY_COLOR;
  }
  private drawBox(point: Point2D, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      point.x * BOX_SIZE,
      point.y * BOX_SIZE,
      BOX_SIZE,
      BOX_SIZE
    );
  }

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  drawBackground() {
    this.ctx.fillStyle = "#EEE";
    this.ctx.fillRect(0, 0, CANVAS_WIDTH * BOX_SIZE, CANVAS_HEIGHT * BOX_SIZE);
  }
  drawSnake(snake: Point2D[]) {
    snake.forEach((v, k) => {
      this.drawBox(v, this.getSnakeBoxColor(k));
    });
  }
  drawApple(apple: Point2D) {
    this.drawBox(apple, APPLE_COLOR);
  }
  drawScore(score: number) {
    const textX = (CANVAS_WIDTH * BOX_SIZE) / 2;
    const textY = (CANVAS_HEIGHT * BOX_SIZE) / 2;

    this.ctx.font = `bold 80px sans-serif`;
    this.ctx.fillStyle = "#d9d9d9";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(score.toString(), textX, textY);
  }
  renderGameOver = () => {
    const textX = (CANVAS_WIDTH * BOX_SIZE) / 2;
    const textY = ((CANVAS_HEIGHT * BOX_SIZE) / 2) * 0.6;

    this.ctx.font = `bold 15px sans-serif`;
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("Game Over", textX, textY);
  };

  static prepareCanvasSize(canvasElem: HTMLCanvasElement) {
    const canvasWidth = CANVAS_WIDTH * BOX_SIZE;
    const canvasHeight = CANVAS_HEIGHT * BOX_SIZE;
    canvasElem.width = canvasWidth;
    canvasElem.height = canvasHeight;
  }
}

export default CanvasUtil;
