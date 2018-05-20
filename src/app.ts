import { Observable, animationFrame } from './lib';
import './snake.ts';
import { createCanvasElem, renderScene, renderApples, renderSnake } from './canvas';

const canvas = createCanvasElem();
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let game$ = Observable.interval(1000, animationFrame)
  .subscribe({
    next: (ind) => {
      renderScene(ctx);
      renderApples(ctx, [
        {x: 1, y: 1},
        {x: 3, y: 3},
      ]);
      renderSnake(ctx, [
        {x: 4, y: 4},
        {x: 4, y: 5},
        {x: 4, y: 6},
        {x: 4, y: 7},
      ])
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