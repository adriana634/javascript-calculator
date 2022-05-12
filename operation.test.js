import {
    matchOperation,
    calcOperation
} from './operation.js';

test('1 + 4 = 5', () => {
    const operationText = "1+4";
    const [previousOperand, operation, currentOperand] = matchOperation(operationText);
    const result = calcOperation(previousOperand, operation, currentOperand);

    expect(result).toBe(5);
});

test('1 - 9 = -8', () => {
    const operationText = "1-9";
    const [previousOperand, operation, currentOperand] = matchOperation(operationText);
    const result = calcOperation(previousOperand, operation, currentOperand);

    expect(result).toBe(-8);
});

test('2 * 2 = 4', () => {
    const operationText = "2*2";
    const [previousOperand, operation, currentOperand] = matchOperation(operationText);
    const result = calcOperation(previousOperand, operation, currentOperand);

    expect(result).toBe(4);
});

test('5 / 2 = 2.5', () => {
    const operationText = "5÷2";
    const [previousOperand, operation, currentOperand] = matchOperation(operationText);
    const result = calcOperation(previousOperand, operation, currentOperand);

    expect(result).toBe(2.5);
});