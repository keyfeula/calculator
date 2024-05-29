let result = 0;
let expression = ["", "", ""];

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
            result = divide(operand1, operand2);
            break;
        default:
            result = 0;
    }
    return result;
}

function displayHandler(event) {
    let target = event.target;

    if (target.tagName !== "BUTTON") {
        return;
    }

    let buttonText = target.textContent;
    
    if (buttonText === "CLEAR") {
        expression[0] = "";
        expression[1] = "";
        expression[2] = "";
        currentDisplay.textContent = "";
        lastDisplay.textContent = "";
    }
    else if (buttonText === "DELETE") {
        if (expression[2] === "") {
            expression[0] = expression[0].slice(0, -1);
            currentDisplay.textContent = expression[0];
        }
        else {
            expression[2] = expression[2].slice(0, -1);
            currentDisplay.textContent = expression[2];
        }
    }
    else if (buttonText === "=") {
        if (expression[1] === "/" && expression[2] === "0") {
            alert("You can't divide by 0!");
            return;
        }

        if (expression[2] !== "") {
            let result = operate(expression[0], expression[2], expression[1]);
            currentDisplay.textContent = result;
            lastDisplay.textContent = `${expression[0]} ${expression[1]} ${expression[2]} =`;
            expression[0] = result + "";
            expression[1] = "";
            expression[2] = "";
        }
    }
    else if (!isNaN(buttonText)){
        if (expression[2] === "" && expression[1] === "") {
            expression[0] += buttonText;
            currentDisplay.textContent = expression[0];
        }
        else if (expression[1] !== "") {
            expression[2] += buttonText;
            currentDisplay.textContent = expression[2];
        }
    }
    else {
        if (expression[0] !== "" && expression[2] === "" && expression[1] === "-") {
            expression[2] += buttonText;
            currentDisplay.textContent = expression[2];
        }
        else if (expression[0] !== "" && expression[2] === "") {
            expression[1] = buttonText;
            lastDisplay.textContent = `${expression[0]} ${expression[1]} ${expression[2]}`;
        } 
        else if (expression[1] === "-" && expression[2] === "") {
            expression[2] += buttonText;
            currentDisplay.textContent = expression[2];
        }
        else if (expression[0] === "" && buttonText === "-") {
            expression[0] += buttonText;
            currentDisplay.textContent = expression[0];
        }
        else if (expression[2] === "" && expression[0] !== "" && buttonText === "-") {
            expression[2] += buttonText;
            currentDisplay.textContent = expression[2];
        }
    }
}

calcBody.addEventListener("click", displayHandler);

