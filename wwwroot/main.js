

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

const fractalSelect = document.getElementById("fractal");
const xMinField = document.getElementById("x-min");
const xMaxField = document.getElementById("x-max");
const yMinField = document.getElementById("y-min");
const yMaxField = document.getElementById("y-max");
const scalingCheckbox = document.getElementById("scaling");
const canvas = document.getElementById("canvas");

const squareComplex = (c) =>
  new Complex(c.re ** 2 - c.im ** 2, 2 * c.re * c.im);
const addComplex = (c1, c2) => new Complex(c1.re + c2.re, c1.im + c2.im);
const mandelbrot = (z, c) => addComplex(squareComplex(z), c);
const burningShip = (z, c) => 
  addComplex(squareComplex(new Complex(Math.abs(z.re), Math.abs(z.im))), c);

function checkDivergence(iterFunction, testValue) {
  let counter = MAX_TIMES;
  let z = START_VALUE;
  while (counter > 0) {
    z = iterFunction(z, testValue);
    if (z.magnitude() > 4) { break };
    counter -= 1;
  }
  return counter
}
//const first = new Worker('fractals.js');
//const second = new Worker('fractals.js');
//const third = new Worker('fractals.js');
//const fourth = new Worker('fractals.js');
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function shuffledArray(width, height) {
  const pixels = width * height;
  let array = new Array(pixels);
  for (let i = 0; i < pixels; i++) {
    array[i] = i;
  }
  shuffle(array);
  return array
}

function colorPixel(data, x, y, value) {
  const target = data.width * y + x;
  data.data[4 * target] = value;

  data.data[4 * target + 3] = 255;
}

function drawFractal(x_min, x_max, y_min, y_max) {
  const width = canvas.width;
  const height = canvas.height;
  const x_pitch = (x_max - x_min) / width;
  const y_pitch = (y_max - y_min) / height;
  const ctx = canvas.getContext("2d", { alpha: false });
  ctx.clearRect(0, 0, width, height);

  let data = ctx.createImageData(width, height);
  let array = shuffledArray(width, height);
  console.log(array.length);
  array.forEach(index => {
    let y = Math.floor(index / width);
    let x = index % width;
    let result = checkDivergence(mandelbrot, new Complex(x_min + x * x_pitch, y_max - y * y_pitch));
    colorPixel(data, x, y, result);
  });
  ctx.putImageData(data, 0, 0);
  console.log("Done!");
}

// Fractals
function clickHandler() {
  const xMin = parseFloat(xMinField.value);
  const xMax = parseFloat(xMaxField.value);
  const yMin = parseFloat(yMinField.value);
  const yMax = scalingCheckbox.checked 
      ? yMin + canvas.height / canvas.width * (xMax - xMin)
      : parseFloat(yMaxField.value);
  const selectedFractal = 
  if (xMin > xMax || yMin > yMax) {
    console.log("Invalid inputs");
    return
  };
  console.log(xMin, xMax, yMin, yMax);
  switch 
  drawFractal(xMin, xMax, yMin, yMax);
}


const btn = document.getElementById("execute");
btn.onclick = clickHandler;
scalingCheckbox.onchange = () => yMaxField.disabled = !yMaxField.disabled;