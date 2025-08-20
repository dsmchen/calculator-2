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
  switch (operator) {
    case '+':
      display.textContent = add(a, b);
      break;
    case '−':
      display.textContent = subtract(a, b);
      break;
    case '×':
      display.textContent = multiply(a, b);
      break;
    case '÷':
      display.textContent = divide(a, b);
      break;
  }
}

const display = document.querySelector('#display');
const equals = document.querySelector('button[value=equals]');

function handleDisplay(e) {
  if (display.textContent === '0' && e.target.classList.contains('digit')) {
    display.textContent = '';
  }
  display.textContent += e.target.value;
}
const displayCharacter = document.querySelectorAll('.display-character');
displayCharacter.forEach((char) =>
  char.addEventListener('click', handleDisplay)
);

function handleEquals() {
  let expression = display.textContent;
  let numbers = expression.match(/\d+/g);
  numberA = Number(numbers[0]);
  numberB = Number(numbers[1]);
  operator = expression.match(/\D/g)[0];
  operate(operator, numberA, numberB);
}
equals.addEventListener('click', handleEquals);
