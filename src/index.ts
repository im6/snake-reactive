import "./style.less";
import { snakeLength$ } from "./observables";

snakeLength$.subscribe((v) => {
  console.log(v);
});
