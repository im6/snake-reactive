import {
  Observable, animationFrame, BehaviorSubject,
  scan, share, startWith,
} from './lib';
import './snake.ts';
import { createCanvasElem, renderScene, renderApples, renderSnake } from './canvas';
import { nextDirection } from './util';
import { DIRECTIONS, INITIAL_DIRECTION, SNAKE_LENGTH, POINTS_PER_APPLE } from './config';

const canvas = createCanvasElem();
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const game$ = Observable.interval(1000, animationFrame)
  .subscribe({
    next: (ind) => {
      renderScene(ctx);
      renderApples(ctx, [
        { x: 1, y: 1 },
        { x: 3, y: 3 },
      ]);
      renderSnake(ctx, [
        { x: 4, y: 4 },
        { x: 4, y: 5 },
        { x: 4, y: 6 },
        { x: 4, y: 7 },
      ]);
    },
    complete: () => console.log('game over.'),
  });


const keydownSource = Observable.fromEvent(document, 'keydown')
  .map((event: KeyboardEvent) => DIRECTIONS[event.keyCode])
  .filter(drc => !!drc)
  .scan(nextDirection)
  .startWith(INITIAL_DIRECTION)
  .distinctUntilChanged();

const subscribe = keydownSource.subscribe((val) => {
  console.log(val);
});

const length$ = new BehaviorSubject<number>(SNAKE_LENGTH);

const snakeLength$ = length$.pipe(
  scan((step, snakeLength) => snakeLength + step),
  share(),
);

const score$ = snakeLength$.pipe(
  startWith(0),
  scan((score, _) => score + POINTS_PER_APPLE),
);
