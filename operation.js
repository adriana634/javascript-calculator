function matchOperation(operationText) {
    //https://stackoverflow.com/a/12643073
    const operationMatch = operationText.match(/^([+-]?[0-9]*[.]?[0-9]+)([\+\-\*\÷])([+-]?[0-9]*[.]?[0-9]+)$/);
    const [_ignore, previousOperand, operation, currentOperand] = operationMatch;

    return [previousOperand, operation, currentOperand];
}

function calcOperation(previousOperand, operation, currentOperand) {
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
    
    return result;
}

export {
    matchOperation,
    calcOperation
};