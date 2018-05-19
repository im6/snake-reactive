import { Observable, animationFrame } from './lib';
import './snake.ts';
import { createCanvasElem, renderScene } from './canvas';

const canvas = createCanvasElem();
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let game$ = Observable.interval(3000, animationFrame)
  .subscribe({
    next: (scene) => renderScene(ctx, scene)
  });