import { createCanvasElem } from './canvas.ts';
import './snake.ts';

let canvas = createCanvasElem();
let ctx = canvas.getContext('2d');
document.body.appendChild(canvas);