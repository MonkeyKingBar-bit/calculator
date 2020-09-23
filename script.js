class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.allClear();
        this.clear();
        this.delete();
    }

    allClear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    clear() {
        this.currentOperand = '';
    }

    delete() {
        this.currentOperand = this.currentOperand.toString(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '%':
                computation = (prev * curr) / 100;
                break;
            case '&radic;':
                computation = Math.sqrt(Math.abs(curr));
                break;
            case 'x^y':
                computation = Math.pow(prev, curr);
                break;
            case 'x/y':
                computation = +(prev / curr).toFixed(1);
                break;
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '&times;':
                computation = prev * curr;
                break;
            case '&divide;':
                computation = prev / curr;
                break;  
            default:
                return;
        }
        this.currentOperand = computation;
        operationButtons = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
    }

}
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector(['data-equals']);

const allClearButton = document.querySelector(['data-all-clear']);
const clearButton = document.querySelector(['data-clear']);
const deleteButton = document.querySelector(['data-delete']);

const previousOperandTextElement = document.querySelector(['data-previous-operand']);
const currentOperandTextElement = document.querySelector(['data-current-operand']);

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.allClear();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})



