
const display = document.querySelector("#display");
const buttons = document.querySelector(".buttons");

const premiumModal = document.querySelector("#premiumModal");
const closeModal = document.querySelector("#closeModal");
const upgradeButton = document.querySelector("#upgradeButton");

let currentInput = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

// Update the calculator display
function updateDisplay() {
    display.textContent = currentInput;
}

// Handle number and decimal button clicks
function inputNumber(number) {
    if (currentInput === "Error") {
        currentInput = "0";
        firstNumber = null;
        operator = null;
        waitingForSecondNumber = false;
    }

    if (waitingForSecondNumber) {
        currentInput = number === "." ? "0." : number;
        waitingForSecondNumber = false;
    } else if (number === "." && currentInput.includes(".")) {
        return;
    } else if (currentInput === "0" && number !== ".") {
        currentInput = number;
    } else {
        currentInput += number;
    }

    updateDisplay();
}

// Perform the selected calculation
function calculate(a, operation, b) {
    switch (operation) {
        case "+":
            return a + b;

        case "-":
            return a - b;

        case "*":
            return a * b;

        case "/":
            if (b === 0) {
                return "Error";
            }
            return a / b;

        default:
            return b;
    }
}

// Handle operator button clicks
function chooseOperator(nextOperator) {
    if (currentInput === "Error") {
        return;
    }

    const inputValue = Number(currentInput);

    if (operator && !waitingForSecondNumber) {
        const result = calculate(
            firstNumber,
            operator,
            inputValue
        );

        if (result === "Error" || !Number.isFinite(result)) {
            currentInput = "Error";
            firstNumber = null;
            operator = null;
            waitingForSecondNumber = true;
            updateDisplay();
            return;
        }

        currentInput = String(Number(result.toPrecision(12)));
        firstNumber = Number(currentInput);
        updateDisplay();
    } else {
        firstNumber = inputValue;
    }

    operator = nextOperator;
    waitingForSecondNumber = true;
}

// Show the premium popup instead of the result
function showResult() {
    if (
        operator === null ||
        waitingForSecondNumber ||
        currentInput === "Error"
    ) {
        return;
    }

    premiumModal.classList.remove("hidden");
}

// Close the premium popup
function closePremiumModal() {
    premiumModal.classList.add("hidden");
}

// Pretend to process an upgrade
function fakeUpgrade() {
    upgradeButton.textContent = "Processing payment...";

    upgradeButton.disabled = true;

    setTimeout(() => {
        upgradeButton.textContent = "Payment failed. Just kidding.";
        
        setTimeout(() => {
            upgradeButton.textContent = "Unlock My Answer";
            upgradeButton.disabled = false;
        }, 1800);
    }, 1000);
}

// Clear everything
function clearCalculator() {
    currentInput = "0";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;

    updateDisplay();
    closePremiumModal();
}

// Delete the last digit
function deleteDigit() {
    if (currentInput === "Error") {
        clearCalculator();
        return;
    }

    if (waitingForSecondNumber) {
        return;
    }

    if (currentInput.length === 1) {
        currentInput = "0";
    } else {
        currentInput = currentInput.slice(0, -1);

        if (currentInput === "-") {
            currentInput = "0";
        }
    }

    updateDisplay();
}

// Listen for clicks on the calculator buttons
buttons.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    if (button.dataset.number !== undefined) {
        inputNumber(button.dataset.number);
    } else if (button.dataset.operator) {
        chooseOperator(button.dataset.operator);
    } else {
        switch (button.dataset.action) {
            case "clear":
                clearCalculator();
                break;

            case "delete":
                deleteDigit();
                break;

            case "equals":
                showResult();
                break;
        }
    }
});

// Premium popup event listeners
closeModal.addEventListener("click", closePremiumModal);
upgradeButton.addEventListener("click", fakeUpgrade);
