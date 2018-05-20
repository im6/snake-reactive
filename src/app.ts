import { Observable, animationFrame } from './lib';
import './snake.ts';
import { createCanvasElem, renderScene } from './canvas';

const canvas = createCanvasElem();
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let game$ = Observable.interval(1000, animationFrame)
  .subscribe({
    next: (ind) => {
      renderScene(ctx);
    },
    complete: () => console.log('game over.'),
  });


let keydownSource = Observable.fromEvent(document, 'keydown')
  .map((event: KeyboardEvent) => {
    return event.keyCode;
  });
const subscribe = keydownSource.subscribe(val => {
  console.log(val);
});