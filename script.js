let firstNumber = "";
let secondNumber = "";
let operator = "";
let operatorClicked = false;
let equalClicked = false;

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll("button.number");
const operatorButtons = document.querySelectorAll("button.operator");
const equalButton = document.querySelector("button.equal");
const clearButton = document.querySelector("button.clear");
const decimalPointButton = document.querySelector("button.decimal-point");
const signButton = document.querySelector("button.sign");

numberButtons.forEach( (button) => button.addEventListener("click", writeDisplay) );
operatorButtons.forEach( (button) =>  button.addEventListener("click", clickOperator) );
equalButton.addEventListener("click", clickEqual);
clearButton.addEventListener("click", clickClear);
decimalPointButton.addEventListener("click", writeDisplay);
signButton.addEventListener("click", clickSign);

function writeDisplay() {
  if (display.textContent.length != 12) {
    if (this.textContent === ".") {
      if (!display.textContent.includes(".") && !operatorClicked && !equalClicked) {
        display.textContent += ".";
      }
    }
    else if (display.textContent == "0" || operatorClicked || equalClicked) {
      display.textContent = this.textContent;
      operatorClicked = false;
      equalClicked = false;
    }
    else {
      display.textContent += this.textContent;
    }
  }
}

function clickOperator() {
  if (firstNumber === "" || operatorClicked) {
    firstNumber = getDisplayNumber();
  }
  else {
    secondNumber = getDisplayNumber();
    display.textContent = operate(firstNumber, secondNumber, operator);
    firstNumber = getDisplayNumber();
    secondNumber = "";
  }
  operatorClicked = true;
  operator = this.textContent;
}

function clickEqual() {
  if (firstNumber !== "" && !operatorClicked) {
    secondNumber = getDisplayNumber();
    display.textContent = operate(firstNumber, secondNumber, operator);
    firstNumber = "";
    secondNumber = "";
  }
  equalClicked = true;
}

function clickClear() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  operatorClicked = false;
  equalClicked = false;
  display.textContent = "0";
}

function clickSign() {
  let string = display.textContent;
  if (string != "0") {
    if (string.includes("-")) {
      display.textContent = string.slice(1);
    }
    else {
      display.textContent = "-" + string;
    }
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
  if (b !== 0) {
    const result = a / b;
    return Math.round(result * 10000000000) / 10000000000;
  }
  else {
    return "Error: div by 0";
  }
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

