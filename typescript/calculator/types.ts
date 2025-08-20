export enum BinaryOperator {
  ADD = '+',
  SUBTRACT = '−',
  MULTIPLY = '×',
  DIVIDE = '÷',
  RAISE = '^',
  ROOT = '√',
}

export enum UnaryOperator {
  FACTORIAL = '!',
  NEGATE = '-',
}

export type Operator = BinaryOperator | UnaryOperator;

export const unaryOperatorMap: Record<string, UnaryOperator> = {
  '!': UnaryOperator.FACTORIAL,
  '-': UnaryOperator.NEGATE,
  '−': UnaryOperator.NEGATE, // '−' is used as a negation operator in the input, but it is not a valid operator in the enum
};

export const unaryOperators = Object.keys(unaryOperatorMap);

export const binaryOperatorMap: Record<string, BinaryOperator> = {
  '+': BinaryOperator.ADD,
  '-': BinaryOperator.SUBTRACT, // '-' is used as a subtraction operator in the input, but it is not a valid operator in the enum
  '−': BinaryOperator.SUBTRACT,
  '×': BinaryOperator.MULTIPLY,
  '*': BinaryOperator.MULTIPLY, // '*' is used as a multiplication operator in the input, but it is not a valid operator in the enum
  '÷': BinaryOperator.DIVIDE,
  '/': BinaryOperator.DIVIDE, // '/' is used as a division operator in the input, but it is not a valid operator in the enum
  '∕': BinaryOperator.DIVIDE, // '∕' is used as a division operator in the input, but it is not a valid operator in the enum
  '^': BinaryOperator.RAISE,
  '√': BinaryOperator.ROOT,
};

export const binaryOperators = Object.keys(binaryOperatorMap);

export enum Order {
  ADD_SUBTRACT = 1,
  MULTIPLY_DIVIDE = 2,
  RAISE_ROOT = 3,
  FACTORIAL_NEGATE = 4,
}

export const OperatorOrder: Record<Operator, Order> = {
  [BinaryOperator.ADD]: 1,
  [BinaryOperator.SUBTRACT]: 1,
  [BinaryOperator.MULTIPLY]: 2,
  [BinaryOperator.DIVIDE]: 2,
  [BinaryOperator.RAISE]: 3,
  [BinaryOperator.ROOT]: 3,
  [UnaryOperator.FACTORIAL]: 4,
  [UnaryOperator.NEGATE]: 4,
} as const;

export const OrderOperators: Record<Order, Operator[]> = {
  1: [BinaryOperator.ADD, BinaryOperator.SUBTRACT],
  2: [BinaryOperator.MULTIPLY, BinaryOperator.DIVIDE],
  3: [BinaryOperator.RAISE, BinaryOperator.ROOT],
  4: [UnaryOperator.FACTORIAL, UnaryOperator.NEGATE],
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface Expression {
  evaluate(): number;
  isEqualStructure(other: Expression): boolean;
  isEqualValue(other: Expression): boolean;
  getOrder(): number;
  toString(): string;
}
