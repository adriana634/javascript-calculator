"use strict";

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');

const equalsButton = document.querySelector('[data-equals');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');

const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

function moveOperationCharacter() {
    const previousOperand = previousOperandTextElement.innerText;
    const currentOperand = currentOperandTextElement.innerText;

    if (/^[\+\-\*\÷]$/.test(currentOperand)) {
        previousOperandTextElement.innerText = `${ previousOperand } ${ currentOperand }`;
        currentOperandTextElement.innerText = currentOperand.slice(1);
    }
}

function numberButtonClick(event) {
    moveOperationCharacter();

    const numberButton = event.target;
    currentOperandTextElement.innerText += numberButton.innerText;
}

function operationButtonClick(event) {
    const operationButton = event.target;
    previousOperandTextElement.innerText = currentOperandTextElement.innerText;
    currentOperandTextElement.innerText = operationButton.innerText;
}

function buildNormalOperationText(previousOperand, currentOperand) {
    const operationText = previousOperand + currentOperand;
    return operationText;
}

function buildRepeatedOperationText(previousOperand, currentOperand) {
    const previousOperationMatch = previousOperand.match(/^[+-]?[0-9]*[.]?[0-9]+([\+\-\*\÷])([+-]?[0-9]*[.]?[0-9]+)$/);
    const [_ignore, operation, previousCurrentOperand] = previousOperationMatch;
    const operationText = currentOperand + operation + previousCurrentOperand;
    return operationText;
}

function buildOperationText() {
    const previousOperand = previousOperandTextElement.innerText.replace(/\s/g, "");
    const currentOperand = currentOperandTextElement.innerText;

    return (/^([+-]?[0-9]*[.]?[0-9]+)([\+\-\*\÷])$/.test(previousOperand))
        ? buildNormalOperationText(previousOperand, currentOperand)
        : buildRepeatedOperationText(previousOperand, currentOperand);
}

function equalsButtonClick(event) {
    const operationText = buildOperationText();

    //https://stackoverflow.com/a/12643073
    const operationMatch = operationText.match(/^([+-]?[0-9]*[.]?[0-9]+)([\+\-\*\÷])([+-]?[0-9]*[.]?[0-9]+)$/);
    const [_ignore, previousOperand, operation, currentOperand] = operationMatch;

    const add = (a, b) => a + b;
    const subtract = (a, b) => a - b;
    const multiply = (a, b) => a * b;
    const divide = (a, b) => a / b;

    const operationDispatcher = {
        '+': add,
        '-': subtract,
        '*': multiply,
        '÷': divide
    };

    const a = Number(previousOperand);
    const b = Number(currentOperand);
    const result = operationDispatcher[operation](a, b);

    previousOperandTextElement.innerText = `${ a } ${ operation } ${ b }`;
    currentOperandTextElement.innerText = result;
}

function allClearButtonClick(event) {
    previousOperandTextElement.innerText = "";
    currentOperandTextElement.innerText = "";
}

function deleteButtonClick(event) {
    const removeLastCharacter = (text) => text.slice(0, text.length - 1);
    currentOperandTextElement.innerText = removeLastCharacter(currentOperandTextElement.innerText);
}

numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', numberButtonClick);
});

operationButtons.forEach(operationButton => {
    operationButton.addEventListener('click', operationButtonClick);
});

equalsButton.addEventListener('click', equalsButtonClick);
deleteButton.addEventListener('click', deleteButtonClick);
allClearButton.addEventListener('click', allClearButtonClick);