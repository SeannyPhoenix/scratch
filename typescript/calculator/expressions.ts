/* eslint-disable no-empty-function */
/* eslint-disable default-case */

import {
  BinaryOperator,
  OperatorOrder,
  UnaryOperator,
  type Expression,
} from 'calculator/types';

export class NumberExpression implements Expression {
  constructor(private value: number) {}

  evaluate() {
    return this.value;
  }

  isEqualStructure(other: Expression): boolean {
    return other instanceof NumberExpression && this.value === other.value;
  }

  isEqualValue(other: Expression): boolean {
    return this.evaluate() === other.evaluate();
  }

  getOrder() {
    return Infinity;
  }

  toString() {
    return this.value.toString();
  }
}

export class UnaryExpression implements Expression {
  constructor(
    private operator: UnaryOperator,
    private operand: Expression
  ) {}

  evaluate(): number {
    switch (this.operator) {
      case UnaryOperator.FACTORIAL:
        return UnaryExpression.factorial(this.operand.evaluate());
      case UnaryOperator.NEGATE:
        return UnaryExpression.negate(this.operand.evaluate());
    }
  }

  public static factorial(n: number): number {
    if (n === 0) {
      return 1;
    }

    return n * this.factorial(n - 1);
  }

  public static negate(n: number): number {
    return -n;
  }

  isEqualStructure(other: Expression): boolean {
    return (
      other instanceof UnaryExpression &&
      this.operator === other.operator &&
      this.operand.isEqualStructure(other.operand)
    );
  }

  isEqualValue(other: Expression): boolean {
    return this.evaluate() === other.evaluate();
  }

  getOrder() {
    return OperatorOrder[this.operator];
  }

  toString() {
    switch (this.operator) {
      case UnaryOperator.FACTORIAL:
        return `${wrapExpression(this, this.operand)}!`;
      case UnaryOperator.NEGATE:
        return `-${wrapExpression(this, this.operand)}`;
    }
  }
}

export class BinaryExpression implements Expression {
  constructor(
    private lhs: Expression,
    private operator: BinaryOperator,
    private rhs: Expression
  ) {}

  evaluate(): number {
    switch (this.operator) {
      case BinaryOperator.ADD:
        return BinaryExpression.add(this.lhs.evaluate(), this.rhs.evaluate());
      case BinaryOperator.SUBTRACT:
        return BinaryExpression.subtract(
          this.lhs.evaluate(),
          this.rhs.evaluate()
        );
      case BinaryOperator.MULTIPLY:
        return BinaryExpression.multiply(
          this.lhs.evaluate(),
          this.rhs.evaluate()
        );
      case BinaryOperator.DIVIDE:
        return BinaryExpression.divide(
          this.lhs.evaluate(),
          this.rhs.evaluate()
        );
      case BinaryOperator.RAISE:
      case BinaryOperator.ROOT:
        // TODO: Implement
        return 0;
    }
  }

  public static add(lhs: number, rhs: number): number {
    return lhs + rhs;
  }

  public static subtract(lhs: number, rhs: number): number {
    return lhs - rhs;
  }

  public static multiply(lhs: number, rhs: number): number {
    return lhs * rhs;
  }

  public static divide(lhs: number, rhs: number): number {
    return lhs / rhs;
  }

  isEqualStructure(other: Expression): boolean {
    return (
      other instanceof BinaryExpression &&
      this.operator === other.operator &&
      this.lhs.isEqualStructure(other.lhs) &&
      this.rhs.isEqualStructure(other.rhs)
    );
  }

  isEqualValue(other: Expression): boolean {
    return this.evaluate() === other.evaluate();
  }

  getOrder() {
    return OperatorOrder[this.operator];
  }

  toString() {
    return `${wrapExpression(this, this.lhs)} ${this.operator} ${wrapExpression(
      this,
      this.rhs
    )}`;
  }
}

export class VariableExpression implements Expression {
  constructor(
    private name: string,
    private expression: Expression
  ) {}

  evaluate(): number {
    return this.expression.evaluate();
  }

  isEqualStructure(other: Expression): boolean {
    return (
      other instanceof VariableExpression &&
      this.name === other.name &&
      this.expression.isEqualStructure(other.expression)
    );
  }

  isEqualValue(other: Expression): boolean {
    return this.evaluate() === other.evaluate();
  }

  hasName(name: string): boolean {
    return this.name === name;
  }

  getOrder() {
    return Infinity;
  }

  toString() {
    return this.name;
  }
}

function wrapExpression(parent: Expression, child: Expression): string {
  if (child.getOrder() < parent.getOrder()) {
    return `(${child.toString()})`;
  }

  return child.toString();
}

export function isExpression(expression: unknown): expression is Expression {
  return (
    expression instanceof NumberExpression ||
    expression instanceof BinaryExpression ||
    expression instanceof UnaryExpression ||
    expression instanceof VariableExpression
  );
}
