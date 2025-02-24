// Calculator
let calculator = document.querySelector(".calculator-container");

// Buttons
let allClearButton = document.querySelector("#allClearButton");
let backButton = document.querySelector("#backButton");
let posNegButton = document.querySelector("#posNegButton");
let divideButton = document.querySelector("#divideButton");
let sevenButton = document.querySelector("#sevenButton");
let eightButton = document.querySelector("#eightButton");
let nineButton = document.querySelector("#nineButton");
let multiplyButton = document.querySelector("#multiplyButton");
let fourButton = document.querySelector("#fourButton");
let fiveButton = document.querySelector("#fiveButton");
let sixButton = document.querySelector("#sixButton");
let minusButton = document.querySelector("#minusButton");
let oneButton = document.querySelector("#oneButton");
let twoButton = document.querySelector("#twoButton");
let threeButton = document.querySelector("#threeButton");
let plusButton = document.querySelector("#plusButton");
let blankButton = document.querySelector("#blankButton");
let zeroButton = document.querySelector("#zeroButton");
let decimalButton = document.querySelector("#decimalButton");
let equalButton = document.querySelector("#equalButton");

let numberButtons = document.querySelectorAll(".number-button");
let operatorButtons = document.querySelectorAll(".operator-button");

// Screen
let calculatorDisplay = document.querySelector(".display-content");

// Operators
let operators = {
    divideButton: "/",
    multiplyButton: "*",
    minusButton: "-",
    plusButton: "+",
}

// Buffers/registers
let register1 = "";  // Register stored in memory.
let register2 = "0"; // Displayed register
let operatorRegister = "";   // Operator stored in memory.


// Register functions.

function swapOperands() {
    let temp = register1;
    setRegister1(register2);
    setRegister2(temp);
}

function setRegister1(numberString) {
    register1 = String(numberString);
}

function setRegister2(numberString) {
    register2 = String(numberString);
}

function prependRegister1(numberString) {
    register1 = String(numberString) + register1;
}

function prependRegister2(numberString) {
    register2 = String(numberString) + register2;
}

function removeLastCharRegister1() {
    if (register1.length > 1 && register1[0] !== "-") {
        setRegister1(register1.substring(0, register1.length - 1));
    } else {
        setRegister1("0");
    }
}

function removeLastCharRegister2() {
    if (register2.length > 1 && register2[0] !== "-") {
        setRegister2(register2.substring(0, register2.length - 1));
    } else {
        setRegister2("0");
    }
}

function appendRegister1(numberString) {
    register1 += String(numberString);
}

function appendRegister2(numberString) {
    register2 += String(numberString);
}

function setOperatorRegister(operatorString) {
    operatorRegister = String(operatorString);
}

function logExpression() {
    console.log(`${register1 ? typeof register1 : 'NONE'}:${register1 || '_'} ${operatorRegister || '_'} ${register2 ? typeof register2 : 'NONE'}:${register2 || '_'}`);
}


// Helper functions.

function evaluateExpression() {
    let a = Number(register1);
    let b = Number(register2);
    let result = 0;

    if (operatorRegister === "+") {
        result = a + b;
    } else if (operatorRegister === "-") {
        result = a - b;
    } else if (operatorRegister === "/") {
        if (b === 0) {
            displayError();
            return;
        } else {
            result = a / b;
        }
    } else if (operatorRegister === "*") {
        result = a * b;
    }

    let resultString = String(result);

    if (resultString.includes(".")) {
        resultString = truncateDecimalString(resultString);
    }

    setRegister1(resultString);
    setRegister2("0");
    setDisplay(register1);
}

function validateNumberString(numberString) {
    if (!numberString.includes(".")) { // Number is not decimal.
        return numberString.length <= 9;
    } else { // Number is decimal.
        let stringParts = numberString.split(".");
        return stringParts[0].length <= 7; // Save room for one decimal place, including decimal.
    }
}

function truncateDecimalString(valueString) {
    // valueString has already been validated, so we know it fits the display, just might need rounding
    if (valueString.length <= 9) {
        return valueString;
    } else {
        let stringParts = valueString.split(".");
        let numWholes = stringParts[0].length;
        let roundingPlace = 9 - 1 - numWholes;
        let value = Number(valueString);
        let roundedValue = Math.round(value * (10 ** roundingPlace)) / (10 ** roundingPlace);

        return roundedValue;
    }
}

function clearMemory() {
    setRegister1("");
    setRegister2("0");
    setOperatorRegister("");
}

function handleKeyPress(e) {
    let key = e.key;

    switch(e.key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            handleNumber(key);
            break;
        case "+":
        case "-":
        case "/":
        case "*":
            handleOperator(key);
            break;
        case "Backspace":
            backspace();
            break;
        case ".":
            makeDecimal();
            break;
        case "\\":
            makePosNeg();
            break;
        case "=":
        case "Enter":
            evaluate();
            break;
        default:
            console.log("UNKNOWN PRESSED");
            break;
    }
}


// Display functions.

function displayError() {
    clearAll();
    setDisplay("ERROR");
}

function clearDisplay() {
    calculatorDisplay.textContent = "0";
}

function setDisplay(value) {
    let valueString = String(value);
    if (validateNumberString(valueString)) {
        calculatorDisplay.textContent = valueString;
    } else {
        displayError();
    }
}


// Calculator functions.

function clearAll() {
    clearMemory();
    clearDisplay();
    logExpression();
}

function registerNumber(e) {
    handleNumber(e.target.textContent);
}

function handleNumber(numberPressed) {
    if (operatorRegister === "" && register1 === "" && register2 === "0") {
        setRegister2(numberPressed);
        setDisplay(register2);
    } else if (operatorRegister === "" && register1 === "" && register2 !== "0") {
        if (register2.length < 9) {
            appendRegister2(numberPressed);
            setDisplay(register2);
        }
    } else if (operatorRegister !== "" && register1 === "" && register2 === "0") {
    } else if (operatorRegister !== "" && register1 === "" && register2 !== "0") {
        if (register2.length < 9) {
            appendRegister2(numberPressed);
            setDisplay(register2);
        }
    } else if (operatorRegister === "" && register1 !== "" && register2 === "0") {
    } else if (operatorRegister === "" && register1 !== "" && register2 !== "0") {
    } else if (operatorRegister !== "" && register1 !== "" && register2 === "0") {
        if (operatorRegister === "=") {
            clearAll();
        }
        setRegister2(numberPressed);
        setDisplay(register2);
    } else if (operatorRegister !== "" && register1 !== "" && register2 !== "0") {
        if (register2.length < 9) {
            appendRegister2(numberPressed);
            setDisplay(register2);
        }
    }
    logExpression();
}

function registerOperator(e) {
    handleOperator(operators[e.target.id]);
}

function handleOperator(operator) {
    if (operatorRegister === "" && register1 === "" && register2 === "0") {
        operatorRegister = operator;
        setRegister1(register2);
        setRegister2("0");
    } else if (operatorRegister === "" && register1 === "" && register2 !== "0") {
        operatorRegister = operator;
        setRegister1(register2);
        setRegister2("0");
    } else if (operatorRegister !== "" && register1 === "" && register2 === "0") {
        operatorRegister = operator;
    } else if (operatorRegister !== "" && register1 === "" && register2 !== "0") { // Shouldn't be possible...
    } else if (operatorRegister === "" && register1 !== "" && register2 === "0") { // Shouldn't be possible...
    } else if (operatorRegister === "" && register1 !== "" && register2 !== "0") { // Shouldn't be possible...
    } else if (operatorRegister !== "" && register1 !== "" && register2 === "0") {
        operatorRegister = operator;
    } else if (operatorRegister !== "" && register1 !== "" && register2 !== "0") {
        evaluateExpression();
        operatorRegister = operator;
    }
    logExpression();
}

function makePosNeg() {
    if (register2[0] === "-") {
        register2 = register2.slice(1);
        setDisplay(register2);
    } else if (register2 !== "0") {
        prependRegister2("-");
        setDisplay(register2);
    } else if (register1 !== "" && operatorRegister === "=") {
        console.log("Before swap");
        logExpression();
        swapOperands();
        setRegister1("");
        setOperatorRegister("");
        console.log("After swap");
        logExpression();
        console.log(`NEG: [${register2}]`);
        logExpression();
        if (register2[0] === "-") {
            register2 = register2.slice(1);
            setDisplay(register2);
        }  else { // Display buffer must contain space for negative sign.
            prependRegister2("-");
            setDisplay(register2);
        }
    }
    logExpression();
}

function backspace() {
    if (register2 !== "0") {
        removeLastCharRegister2();
        setDisplay(register2);
    } else if (register1 !== "" && operatorRegister === "=") {
        swapOperands();
        setRegister1("");
        setOperatorRegister("");
        removeLastCharRegister2();
        setDisplay(register2);
    }
    logExpression();
}

function makeDecimal() {
    if (register2 !== "0") {
        if (!register2.includes(".")) {
            appendRegister2(".");
            setDisplay(register2);
        }
    } else if (register1 !== "" && operatorRegister === "=") {
        if (!register1.includes(".")) {
            swapOperands();
            setRegister1("");
            setOperatorRegister("");
            appendRegister2(".");
            setDisplay(register2);
        }
    } else {
        appendRegister2(".");
        setDisplay(register2);
    }
    logExpression();
}

function evaluate() {
    // Must have two operands and an operator to evaluate.
    if (operatorRegister !== "" && operatorRegister !== "=" && register1 !== "") { // Number op number.
        evaluateExpression();
        setOperatorRegister("=");
    } 
    logExpression();
}


// Event listeners.

allClearButton.addEventListener("click", clearAll);

numberButtons.forEach((elem) => {
    elem.addEventListener("click", registerNumber);
})

operatorButtons.forEach((elem) => {
    elem.addEventListener("click", registerOperator);
})

equalButton.addEventListener("click", evaluate);

posNegButton.addEventListener("click", makePosNeg);

decimalButton.addEventListener("click", makeDecimal);

backButton.addEventListener("click", backspace);

document.addEventListener("keydown", handleKeyPress);
