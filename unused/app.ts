import {
  Observable,
  animationFrame,
  BehaviorSubject,
  scan,
  share,
  startWith,
  combineLatest,
  takeWhile,
  of,
  map,
  interval,
  tap,
  withLatestFrom,
} from "./lib";

import {
  createCanvasElem,
  renderScene,
  renderApples,
  renderSnake,
  move,
  eat,
  initSnake,
  initApples,
  nextDirection,
} from "./service";

import {
  DIRECTIONS,
  INITIAL_DIRECTION,
  SNAKE_LENGTH,
  POINTS_PER_APPLE,
} from "./config";

const canvas = document.getElementById("appCan");
const ctx = canvas.getContext("2d");

const keydownSource = Observable.fromEvent(document, "keydown")
  .map((event: KeyboardEvent) => DIRECTIONS[event.keyCode])
  .filter((drc) => !!drc)
  .scan(nextDirection)
  .startWith(INITIAL_DIRECTION)
  .distinctUntilChanged();

const tickSource = interval(400, animationFrame);

const length$ = new BehaviorSubject<number>(SNAKE_LENGTH);
const snakeLength$ = length$
  .scan((step, snakeLength) => snakeLength + step)
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
  share()
);

const appleSource = snakeSource
  .scan(eat, initApples())
  .distinctUntilChanged()
  .share();

snakeSource.subscribe({
  next: (a) => {
    renderScene(ctx);
    renderApples(ctx, [
      { x: 1, y: 1 },
      { x: 3, y: 3 },
    ]);
    renderSnake(ctx, a);
  },
  complete: () => console.log("game over."),
});

// source: https://github.com/thoughtram/reactive-snake/blob/master/src/main.ts
