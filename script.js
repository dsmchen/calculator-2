function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let operator;
let numberA;
let numberB;

function operate(operator, a, b) {
  let sum = 0;

  switch (operator) {
    case '+':
      sum = add(a, b);
      break;
    case '−':
      sum = subtract(a, b);
      break;
    case '×':
      sum = multiply(a, b);
      break;
    case '÷':
      sum = divide(a, b);
      break;
  }

  function isLongDecimal(num) {
    return (
      num.toString().includes('.') && num.toString().split('.')[1].length > 15
    );
  }

  if (isLongDecimal(sum)) {
    display.textContent = sum.toFixed(15);
  } else {
    display.textContent = sum;
  }
}

const display = document.querySelector('#display');
const equals = document.querySelector('button[value=equals]');
const clear = document.querySelector('button[value=clear]');
let operatorRegex = /\D/g;
let expressionRegex = /-?\d+\D\d+/g;
let isFinalResult = false;

function handleDisplay(e) {
  let expression = display.textContent;

  if (
    (expression === '0' || isFinalResult) &&
    e.target.classList.contains('digit')
  ) {
    // Init display for digit
    display.textContent = '';
    isFinalResult = false;
  }

  let numOpRegex = /^-?\d+\D$/;
  if (expression.match(numOpRegex) && e.target.classList.contains('operator')) {
    // Change operator
    let operator = expression.match(operatorRegex)[0];
    if (operator === e.target.value) return;
    display.textContent = expression.replace(operator, '');
  }

  if (
    expression.match(expressionRegex) &&
    e.target.classList.contains('operator')
  ) {
    // Operate long expression
    handleEquals(e.target.value);
  } else {
    // Display character
    display.textContent += e.target.value;
  }
}
const displayCharacter = document.querySelectorAll('.display-character');
displayCharacter.forEach((char) =>
  char.addEventListener('click', handleDisplay)
);

function handleEquals(lastOperator = 0) {
  let expression = display.textContent;

  if (!expression.match(expressionRegex)) return;

  let divideByZeroRegex = /÷0/;
  if (expression.match(divideByZeroRegex)) {
    return (display.textContent = 'Undefined');
  }

  let numberRegex = /\d+/g;
  let numbers = expression.match(numberRegex);
  numberA = Number(numbers[0]);
  numberB = Number(numbers[1]);
  operator = expression.match(operatorRegex)[0];
  operate(operator, numberA, numberB);
  isFinalResult = true;

  if (lastOperator && typeof lastOperator !== 'object') {
    // Display long expression
    display.textContent += lastOperator;
    isFinalResult = false;
  }
}
equals.addEventListener('click', handleEquals);

function handleClear() {
  display.textContent = 0;
}
clear.addEventListener('click', handleClear);
