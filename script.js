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
const deleteButton = document.querySelector("button.delete");

numberButtons.forEach( (button) => button.addEventListener("click", writeDisplay) );
operatorButtons.forEach( (button) =>  button.addEventListener("click", clickOperator) );
equalButton.addEventListener("click", clickEqual);
clearButton.addEventListener("click", clickClear);
decimalPointButton.addEventListener("click", writeDisplay);
signButton.addEventListener("click", clickSign);
deleteButton.addEventListener("click", clickDelete);

function writeDisplay() {
  if (this.textContent === "." && display.textContent.length != 12) {
    if (!display.textContent.includes(".") && !operatorClicked && !equalClicked) {
      display.textContent += ".";
    }
  }
  else if (display.textContent == "0" || operatorClicked || equalClicked) {
    display.textContent = this.textContent;
    operatorClicked = false;
    equalClicked = false;
  }
  else if (display.textContent.length != 12) {
    display.textContent += this.textContent;
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

function clickDelete() {
  let string = display.textContent;
  if (string != "0") {
    if (string.length == 1) {
      display.textContent = "0";
    }
    else {
      display.textContent = string.slice(0, -1);
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
    return result = a / b;
  }
  else {
    return "Error: div by 0";
  }
}

function operate(number1, number2, operator) {
  let result;
  switch (operator) {
    case "+":
      result = add(number1, number2);
      break;
    case "-":
      result = subtract(number1, number2);
      break;
    case "X":
      result = multiply(number1, number2);
      break;
    case "/":
      result = divide(number1, number2);
      break;
  }
  if (result == "Error: div by 0" ) {
    return result;
  }
  else if (result.toString().length > 12) {
    return roundResult(result);
  }
  else {
    return result;
  }
}

function getLengthInt(decimalNumber) { // returns the integer part length of a decimal number
  const decimalPointIndex = decimalNumber.indexOf(".");
  return decimalNumber.slice(0, decimalPointIndex).length;
}

function roundResult(number) {
  if (number > 9999999999.9) { //it is bigger than the bigger number with 12 digits
      return number.toExponential(6);
    }
  else { // then it's a decimal number
    if (number > 1) {
      const intLength = getLengthInt(number.toString());
      return number.toFixed(11 - intLength);
    }
    else {
      if (number < 0.0000000009) {
        return number.toExponential(6);
      }
      else {
        return number.toFixed(10);
      }
    }
  }
}