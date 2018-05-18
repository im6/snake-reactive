import { Observable  } from 'rxjs';

const c = Observable.fromEvent;
let keydown$ = Observable.fromEvent(document, 'keydown');