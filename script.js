let operand1 = 0;
let operand2 = 0;
let operator = "";

const calcBody = document.querySelector(".calc-body");
const display = document.querySelector(".display");

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

function displayHandler(event) {
    let target = event.target;
    if (target.tagName === "BUTTON") {
        display.textContent += target.textContent;
    }
}

calcBody.addEventListener("click", displayHandler);

