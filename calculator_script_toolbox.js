let addToDisplay = (val) => {
  document.getElementById('display').value += val;
};

let backspace = () => {
  let expression = document.getElementById('display').value;
  document.getElementById('display').value = expression.slice(0, -1);
};

let clearDisplay = () => {
  document.getElementById('display').value = '';
};

let calculate = () => {
  let expression = document.getElementById('display').value;
  let tokens = tokenize(expression);
  let result = evaluate(tokens);
  document.getElementById('display').value = result;
};

let tokenize = (expression) => {
  let tokens = [];
  let currentToken = '';

  for (let char of expression) {
    if ('0123456789.'.includes(char)) {
      currentToken += char;
    } else {
      if (currentToken) {
        tokens.push(currentToken);
        currentToken = '';
      }

      if ('+-*/'.includes(char)) {
        tokens.push(char);
      }
    }
  }

  if (currentToken) {
    tokens.push(currentToken);
  }

  return tokens;
};

let evaluate = (tokens) => {
  let operatorPrecedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };
  let operandStack = [];
  let operatorStack = [];

  for (let token of tokens) {
    if (!isNaN(token)) {
      operandStack.push(Number(token));
    } else {
      while (operatorStack.length > 0 && operatorPrecedence[operatorStack[operatorStack.length - 1]] >= operatorPrecedence[token]) {
        let operator = operatorStack.pop();
        let operand2 = operandStack.pop();
        let operand1 = operandStack.pop();
        let result = evaluateOperation(operator, operand1, operand2);
        operandStack.push(result);
      }

      operatorStack.push(token);
    }
  }

  while (operatorStack.length > 0) {
    let operator = operatorStack.pop();
    let operand2 = operandStack.pop();
    let operand1 = operandStack.pop();
    let result = evaluateOperation(operator, operand1, operand2);
    operandStack.push(result);
  }

  return operandStack[0];
};

let evaluateOperation = (operator, operand1, operand2) => {
  switch (operator) {
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2;
    case '*':
      return operand1 * operand2;
    case '/':
      return operand1 / operand2;
  }
};

document.addEventListener('keydown', function (event) {
  if (event.code === 'Enter' || event.code === 'NumpadEnter') {
    calculate();
  }
});