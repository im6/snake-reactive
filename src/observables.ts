import {
  interval,
  fromEvent,
  animationFrameScheduler,
  BehaviorSubject,
} from "rxjs";
import {
  map,
  filter,
  startWith,
  scan,
  share,
  distinctUntilChanged,
} from "rxjs/operators";
import { DIRECTIONS, INITIAL_DIRECTION, SNAKE_LENGTH } from "./constant";
import { nextDirection } from "./helper";

export const keydownSource = fromEvent(document, "keydown").pipe(
  map((event: KeyboardEvent) => DIRECTIONS[event.key]),
  filter((dir) => Boolean(dir)), // remove unrelated key event
  startWith(INITIAL_DIRECTION),
  scan(nextDirection), // create cache to check previous direction
  distinctUntilChanged()
);

export const tickSource = interval(400, animationFrameScheduler);
export const length$ = new BehaviorSubject<number>(SNAKE_LENGTH);
export const snakeLength$ = length$.pipe(
  scan((step, snakeLength) => snakeLength + step),
  share()
);
