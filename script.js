let result = 0;
let operand1 = "";
let operand2 = "";
let operator = "";
let operatorPressed = false;
let currentOperand = "operand1";

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
    operand1 = Number(operand1);
    operand2 = Number(operand2);

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
            if (operand2 === 0) {
                return "divide by 0";
            }
            result = divide(operand1, operand2);
            break;
        default:
            result = 0;
    }
    if (!Number.isInteger(result)) {
        result = result.toFixed(2);
    }
    return result;
}

function clearCalculator() {
    operand1 = "";
    operand2 = "";
    operator = "";
    result = "";
    operatorPressed = false;
    currentDisplay.textContent = "";
    lastDisplay.textContent = "";
    currentOperand = "operand1";
}

function operationHelper(buttonText) {
    if (operand1 === "-" || operand2 === "-" && operatorPressed) {
        return;
    }
    else if (operand1 === "" && buttonText === "-") {
        currentDisplay.textContent = "-";
        operand1 += "-";
        return;
    }
    else if (operand2 === "" && buttonText === "-" && operator !== "" && operand1 !== "-") {
        currentDisplay.textContent = "-";
        operand2 += "-";
        return;
    }
    else if (operand1 === "") {
        return;
    }

    if (!operatorPressed) {
        operatorPressed = true;
        operator = buttonText;
        lastDisplay.textContent = `${operand1} ${operator}`;
        currentOperand = "operand2";
    }
    else if (operand2 !== "" && operator !== "" && operatorPressed) {
        result = operate(operand1, operand2, operator);
        operator = buttonText;
        lastDisplay.textContent = `${result} ${operator}`;
        currentDisplay.textContent = `${result}`;
        operand1 = result;
        operand2 = "";
    }
}

function displayHandler(event) {
    let target = event.target;

    if (target.tagName !== "BUTTON") {
        return;
    }

    let buttonText = target.textContent;

    if (buttonText === "+" || buttonText === "-" || buttonText === "x" || buttonText === "/") {
        operationHelper(buttonText);
    }
    else if (buttonText === ".") {
        if  (currentOperand === "operand1") {
            if (!operand1.includes(".") && operand1 !== "") {
                operand1 += ".";
                currentDisplay.textContent = operand1;
            }
        }
        else {
            if (!operand2.includes(".") && operand2 !== "") {
                operand2 += ".";
                currentDisplay.textContent = operand2;
            }
        }
    }
    else if (buttonText === "=") {
        if (operand1 !== "" && operand2 !== "" && operator !== "") {
            result = operate(operand1, operand2, operator);
            lastDisplay.textContent = `${operand1} ${operator} ${operand2} =`;
            currentDisplay.textContent = `${result}`;
        }
    }
    else if (buttonText === "CLEAR") {
        clearCalculator();
    }
    else if (buttonText === "DELETE") {
        if (currentOperand === "operand1") {
            operand1 = operand1.slice(0, -1);
            currentDisplay.textContent = operand1;
        }
        else {
            operand2 = operand2.slice(0, -1);
            currentDisplay.textContent = operand2;
        }
    }
    else {
        if (currentOperand === "operand1" && operand1.length <= 22) {
            operand1 += buttonText;
            currentDisplay.textContent = operand1;
        }
        else if (currentOperand === "operand2" && operand2.length <= 22) {
            operand2 += buttonText;
            if (operand2 === "0" && operator === "/") {
                alert("You can't divide by 0!");
                clearCalculator();
                return;
            }
            currentDisplay.textContent = operand2;
        }
    }
}

calcBody.addEventListener("click", displayHandler);

