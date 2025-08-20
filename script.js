function add(a, b) {
  a + b;
}

function subtract(a, b) {
  a - b;
}

function multiply(a, b) {
  a * b;
}

function divide(a, b) {
  a / b;
}

let operator;
let numberA;
let numberB;

function operate(operator, a, b) {
  switch (operator) {
    case 'add':
      add(a, b);
      break;
    case 'subtract':
      subtract(a, b);
      break;
    case 'multiply':
      multiply(a, b);
      break;
    case 'divide':
      divide(a, b);
      break;
    default:
      'Sorry, something went wrong. Please try again later.';
  }
}
