let operand1 = null;
let operand2 = null;
let operator = "";

let displayValue = "";
let result = 0;
let operatorPressed = false;

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
        case "x":
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
            lastDisplay.textContent = "";
            currentDisplay.textContent = "";
            displayValue = "";
            operand1 = null;
            operand2 = null;
            operator = "";
            operatorPressed = false;
        }
        else if (textContent === "DELETE") {
            displayValue = displayValue.slice(0, -1);
            currentDisplay.textContent = displayValue;
        }
        else if (textContent === "=") {
            let result = operate(operand1, operand2, operator);
            currentDisplay.textContent = result;
        }
        else if (!isNaN(textContent)){
            displayValue += target.textContent;
            if (!operatorPressed) {
                operand1 = Number(displayValue);
            }
            else {
                operand2 = Number(displayValue);
            }
            currentDisplay.textContent = displayValue;
        }
        else {
            lastDisplay.textContent = `${displayValue} ${target.textContent}`;
            operator = textContent;
            currentDisplay.textContent = operand1;
            operatorPressed = true;
            displayValue = "";
        }
    }
}

calcBody.addEventListener("click", displayHandler);

