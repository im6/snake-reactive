import {
  Observable, animationFrame, BehaviorSubject,
  scan, share, startWith, combineLatest, takeWhile,
  of, map, interval, tap, withLatestFrom,
} from './lib';
import './snake.ts';
import { createCanvasElem, renderScene, renderApples, renderSnake } from './canvas';
import { move, initSnake, nextDirection } from './snake';
import { DIRECTIONS, INITIAL_DIRECTION, SNAKE_LENGTH, POINTS_PER_APPLE } from './config';

const canvas = createCanvasElem();
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const keydownSource = Observable.fromEvent(document, 'keydown')
  .map((event: KeyboardEvent) => DIRECTIONS[event.keyCode])
  .filter(drc => !!drc)
  .scan(nextDirection)
  .startWith(INITIAL_DIRECTION)
  .distinctUntilChanged();

const tickSource = interval(1000, animationFrame);

const length$ = new BehaviorSubject<number>(SNAKE_LENGTH);
const snakeLength$ = length$
  .scan((step, snakeLength) => {
    debugger;
    return snakeLength + step;
  })
  .share();

const score$ = snakeLength$
  .startWith(0)
  .scan((score, _) => score + POINTS_PER_APPLE);

const snakeSource = tickSource.pipe(
  withLatestFrom(keydownSource, snakeLength$, (_, direction, snakeLength) => {
    return {
      direction,
      snakeLength,
    };
  }),
  scan(move, initSnake()),
  share(),
);


snakeSource.subscribe({
  next: (a) => {
    renderScene(ctx);
    renderApples(ctx, [
      { x: 1, y: 1 },
      { x: 3, y: 3 },
    ]);
    renderSnake(ctx, a);
  },
  complete: () => console.log('game over.'),
});