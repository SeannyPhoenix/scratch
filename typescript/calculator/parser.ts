import {
  BinaryExpression,
  NumberExpression,
  UnaryExpression,
  isExpression,
} from 'calculator/expressions';
import {
  BinaryOperator,
  Order,
  OrderOperators,
  UnaryOperator,
  binaryOperatorMap,
  binaryOperators,
  unaryOperatorMap,
  type Expression,
  type Operator,
} from 'calculator/types';

const TOKEN_REGEX = /[A-Za-z]+|[\d\.]+|[^\d\.A-Za-z\s]/g;

type SubExpression = Expression | Operator;
export type ExpressionStack = SubExpression[];

export function parseExpression(expression: string): Expression {
  const tokens = expression.match(TOKEN_REGEX);
  if (!tokens) {
    throw new Error('Invalid expression: no tokens found');
  }

  return parseExpressionStack(tokens);
}

function parseExpressionStack(tokens: string[]): Expression {
  if (!tokens) {
    throw new Error('Invalid expression: no tokens found');
  }

  const stack: SubExpression[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const [prevToken, currToken, nextToken] = [
      tokens[i - 1],
      tokens[i],
      tokens[i + 1],
    ];
    if (isNumber(currToken)) {
      // Number
      stack.push(new NumberExpression(Number(currToken)));
    } else if (
      unaryOperatorMap[currToken] === UnaryOperator.NEGATE &&
      !isNumber(prevToken) &&
      prevToken !== ')' &&
      (isNumber(nextToken) || nextToken === '(')
    ) {
      // Negative
      stack.push(UnaryOperator.NEGATE);
    } else if (currToken === UnaryOperator.FACTORIAL) {
      // Factorial
      stack.push(UnaryOperator.FACTORIAL);
    } else if (binaryOperators.includes(currToken)) {
      // Binary operator
      stack.push(binaryOperatorMap[currToken]);
    } else if (currToken === '(') {
      // Parentheses
      if (isExpression(stack[stack.length - 1])) {
        stack.push(BinaryOperator.MULTIPLY);
      }

      let j = i + 1;
      let openParentheses = 1;
      const subExpression: string[] = [];
      while (openParentheses && j < tokens.length) {
        const innerToken = tokens[j];
        if (innerToken === '(') {
          openParentheses += 1;
        } else if (innerToken === ')') {
          openParentheses -= 1;
        }
        if (openParentheses) {
          subExpression.push(innerToken);
        }
        j++;
      }
      if (openParentheses) {
        throw new Error('Invalid expression: mismatched parentheses');
      }
      stack.push(parseExpressionStack(subExpression));
      i = j - 1;
    } else {
      throw new Error(`Invalid token: ${currToken}`);
    }
  }
  handleOperations(stack, Order.FACTORIAL_NEGATE);
  handleOperations(stack, Order.RAISE_ROOT);
  handleOperations(stack, Order.MULTIPLY_DIVIDE);
  handleOperations(stack, Order.ADD_SUBTRACT);

  if (stack.length !== 1 || !isExpression(stack[0])) {
    throw new Error('Invalid expression');
  }

  return stack[0];
}

export function handleOperations(stack: SubExpression[], order: Order) {
  const operators = OrderOperators[order];

  for (let i = 0; i < stack.length; i++) {
    const [prev, curr, next] = [stack[i - 1], stack[i], stack[i + 1]];
    // eslint-disable-next-line default-case
    switch (order) {
      case Order.RAISE_ROOT:
        // TODO: Implement
        break;
      case Order.FACTORIAL_NEGATE:
        if (curr === UnaryOperator.NEGATE && isExpression(next)) {
          stack.splice(i, 2, new UnaryExpression(curr, next));
          i--;
        } else if (curr === UnaryOperator.FACTORIAL && isExpression(prev)) {
          stack.splice(i - 1, 2, new UnaryExpression(curr, prev));
          i--;
        }
        break;
      case Order.MULTIPLY_DIVIDE:
      case Order.ADD_SUBTRACT:
        if (operators.some(operator => curr === operator)) {
          if (isExpression(prev) && isExpression(next)) {
            stack.splice(
              i - 1,
              3,
              new BinaryExpression(prev, curr as BinaryOperator, next)
            );
            i--;
          }
        }
        break;
    }
  }
}

function isNumber(value: string): boolean {
  return !isNaN(Number(value));
}
