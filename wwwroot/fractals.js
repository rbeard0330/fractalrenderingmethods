class Complex {
  constructor(re, im) {
    this.re = re || 0;
    this.im = im || 0;
  }

  magnitude() {
    return this.re ** 2 + this.im ** 2
  }
}

const MAX_TIMES = 255;
const START_VALUE = new Complex(0, 0);
const THRESHOLD = 4;

const squareComplex = (c) =>
  new Complex(c.re ** 2 - c.im ** 2, 2 * c.re * c.im);
const addComplex = (c1, c2) => new Complex(c1.re + c2.re, c1.im + c2.im);
const mandelbrot = (z, c) => addComplex(squareComplex(z), c);

function checkDivergence(iterFunction, testValue) {
  let counter = MAX_TIMES;
  let z = START_VALUE;
  while (counter > 0 && z.magnitude() <= THRESHOLD) {
    z = iterFunction(z, testValue);
    counter -= 1;
  }
  return counter
}

onmessage = (c) => checkDivergence(mandelbrot, c);