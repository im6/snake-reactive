import {
  BehaviorSubject,
  interval,
  fromEvent,
  animationFrameScheduler,
  combineLatestWith,
} from "rxjs";

import {
  map,
  buffer,
  filter,
  startWith,
  scan,
  distinctUntilChanged,
  withLatestFrom,
  share,
  skip,
  takeWhile,
} from "rxjs/operators";

import {
  initializeSnake,
  nextDirection,
  move,
  isGameOver,
  createApple,
  auditApplePosition,
} from "./util/game";

import {
  SPEED,
  DIRECTIONS,
  FPS,
  INITIAL_DIRECTION,
  SNAKE_LENGTH,
} from "./constant";

const ticks$ = interval(SPEED);
const keydown$ = fromEvent(document, "keydown").pipe(
  buffer(ticks$),
  filter((events: KeyboardEvent[]) => events.length > 0),
  map((events: KeyboardEvent[]) => DIRECTIONS[events[events.length - 1].key]),
  filter((dir) => Boolean(dir)),
  startWith(INITIAL_DIRECTION),
  scan(nextDirection),
  distinctUntilChanged()
);

const eatBhv$ = new BehaviorSubject<number>(0);
const snakeLen$ = eatBhv$.pipe(scan((acc, cur) => acc + cur, SNAKE_LENGTH));
const snake$ = ticks$.pipe(
  withLatestFrom(keydown$, snakeLen$, (_, direction, snakeLen) => [
    direction,
    snakeLen,
  ]),
  scan(move, initializeSnake(SNAKE_LENGTH))
);

const apple$ = snake$.pipe(
  scan(auditApplePosition, createApple()),
  distinctUntilChanged(),
  share()
);

apple$.pipe(skip(1)).subscribe(() => {
  eatBhv$.next(1);
});

const scene$ = snake$.pipe(combineLatestWith(apple$));

export const game$ = interval(1000 / FPS, animationFrameScheduler).pipe(
  withLatestFrom(scene$, (_, scene$) => scene$),
  takeWhile(isGameOver)
);
