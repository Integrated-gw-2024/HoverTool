import p5 from 'p5';
import { sketch } from "./sketch";

window.onload = () => {
  new p5(sketch);
};

// const app = new p5(sketch, document.body);