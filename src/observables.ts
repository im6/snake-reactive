import {
  interval,
  fromEvent,
  animationFrameScheduler,
  of,
  combineLatest,
} from "rxjs";
import {
  map,
  filter,
  startWith,
  scan,
  distinctUntilChanged,
  withLatestFrom,
} from "rxjs/operators";
import { DIRECTIONS, INITIAL_DIRECTION, SNAKE_LENGTH } from "./constant";
import { initializeSnake, nextDirection, move } from "./helper";

export const keydown$ = fromEvent(document, "keydown").pipe(
  map((event: KeyboardEvent) => DIRECTIONS[event.key]),
  filter((dir) => Boolean(dir)), // remove unrelated key event
  startWith(INITIAL_DIRECTION),
  scan(nextDirection), // create cache to check previous direction
  distinctUntilChanged()
);

export const ticks$ = interval(1000, animationFrameScheduler);
export const snakeLength$ = of(0);

export const snake$ = ticks$.pipe(
  withLatestFrom(keydown$, snakeLength$, (_, direction, snakeLen) => [
    direction,
    snakeLen,
  ]),
  scan(move, initializeSnake(SNAKE_LENGTH))
);
