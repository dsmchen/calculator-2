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

function handleDisplay(e) {
  if (display.textContent === '0' && e.target.classList.contains('digit')) {
    display.textContent = '';
  }
  const operatorRegex = /\D/;
  if (
    operatorRegex.test(display.textContent) &&
    e.target.classList.contains('operator')
  ) {
    handleEquals(e.target.value);
  } else {
    display.textContent += e.target.value;
  }
}
const displayCharacter = document.querySelectorAll('.display-character');
displayCharacter.forEach((char) =>
  char.addEventListener('click', handleDisplay)
);

function handleEquals(lastOperator = 0) {
  let expression = display.textContent;

  let expressionRegex = /-?\d+\D\d+/g;
  if (!expression.match(expressionRegex)) return;

  let numbers = expression.match(/\d+/g);
  numberA = Number(numbers[0]);
  numberB = Number(numbers[1]);
  operator = expression.match(/\D/g)[0];
  operate(operator, numberA, numberB);

  if (lastOperator && typeof lastOperator !== 'object') {
    display.textContent += lastOperator;
  }
}
equals.addEventListener('click', handleEquals);

function handleClear() {
  display.textContent = 0;
}
clear.addEventListener('click', handleClear);
