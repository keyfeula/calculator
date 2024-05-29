let operand1 = 0;
let operand2 = 0;
let operator = "";

let displayValue = "";
let result = 0;

const calcBody = document.querySelector(".calc-body");
const currentDisplay = document.querySelector(".current-display");
const lastDisplay = document.querySelector(".last-display");

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

function operate(operand1, operand2, operator) {
    let result = 0;
    switch (operator) {
        case "+":
            result = add(operand1, operand2);
            break;
        case "-":
            result = subtract(operand1, operand2);
            break;
        case "*":
            result = multiply(operand1, operand2);
            break;
        case "/":
            result = divide(operand1, operand2);
            break;
        default:
            result = 0;
    }
    return result;
}

function updateDisplay(str) {
    currentDisplay.textContent = str;
}

function getDisplayValue() {
    return currentDisplay.textContent;
}

function displayHandler(event) {
    let target = event.target;
    if (target.tagName === "BUTTON") {
        let textContent = target.textContent;
        if (textContent === "CLEAR") {
            updateDisplay("");
            displayValue = "";
        }
        else if (textContent === "DELETE") {
            displayValue = displayValue.slice(0, -1);
            currentDisplay.textContent = displayValue;
        }
        else if (textContent === "=") {

        }
        else {
            updateDisplay(getDisplayValue() + target.textContent);
            displayValue += target.textContent;
        }
    }
}

calcBody.addEventListener("click", displayHandler);

