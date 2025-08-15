const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let operator = "";
let firstValue = "";
let waitingForSecondValue = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (value === "C") {
            currentInput = "";
            firstValue = "";
            operator = "";
            display.value = "";
            return;
        }

        if (value === "⌫") {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
            return;
        }

        if (value === "=") {
            if (operator === "^") {
                currentInput = Math.pow(parseFloat(firstValue), parseFloat(currentInput)).toString();
            } else if (operator === "10^") {
                currentInput = Math.pow(10, parseFloat(currentInput)).toString();
            } else if (operator === "√") {
                currentInput = Math.sqrt(parseFloat(currentInput)).toString();
            } else {
                currentInput = eval(firstValue + operator + currentInput).toString();
            }
            display.value = currentInput;
            operator = "";
            return;
        }

        if (["+", "-", "*", "/", "%", "^", "10^", "√"].includes(value)) {
            if (currentInput === "" && value !== "√") return;
            if (value === "√") {
                operator = "√";
                display.value = "√" + currentInput;
                return;
            }
            firstValue = currentInput;
            operator = value;
            waitingForSecondValue = true;
            display.value = currentInput + " " + value + " ";
            currentInput = "";
            return;
        }

        currentInput += value;
        display.value += value;
    });
});
