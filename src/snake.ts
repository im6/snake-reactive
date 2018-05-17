import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';


const source = from([1, 2, 3, 4, 5])
  .pipe(map(val => val + 10))
  .subscribe(val => console.log(val));