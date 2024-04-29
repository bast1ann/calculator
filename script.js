let firstNumber = "";
let secondNumber = "";
let operator = "";
let operatorClicked = false;

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll("button.number");
const operatorButtons = document.querySelectorAll("button.operator");
const equalButton = document.querySelector("button.equal");

numberButtons.forEach( (button) => button.addEventListener("click", writeDisplay) );
operatorButtons.forEach( (button) =>  button.addEventListener("click", clickOperator) );
equalButton.addEventListener("click", clickEqual);

function writeDisplay() {
  if (display.textContent == "0" || operatorClicked == true) {
    display.textContent = this.textContent;
    operatorClicked = false;
  }
  else {
    display.textContent += this.textContent;
  }
}

function clickOperator() {
  if (firstNumber !== "" && operator !== "") {
    if (!operatorClicked) {
      secondNumber = getDisplayNumber();
      display.textContent = operate(firstNumber, secondNumber, operator);
      firstNumber = getDisplayNumber();
      secondNumber = "";
    }
  }
  else {
    firstNumber = getDisplayNumber();
  }
  operatorClicked = true;
  operator = this.textContent;
}

function clickEqual() {
  if (firstNumber !== "") {
    secondNumber = getDisplayNumber();
    display.textContent = operate(firstNumber, secondNumber, operator);
    firstNumber = "";
    secondNumber = "";
    operator = "";
  }
}

function getDisplayNumber() {
  return Number(display.textContent);
}

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

function operate(number1, number2, operator) {
  switch (operator) {
    case "+":
      return add(number1, number2);
    case "-":
      return subtract(number1, number2);
    case "X":
      return multiply(number1, number2);
    case "/":
      return divide(number1, number2);
  }
}

