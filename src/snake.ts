import { Observable  } from 'rxjs';

const c = Observable.fromEvent;
const keydown$ = Observable.fromEvent(document, 'keydown');
