import { parseExpression } from './parser';
import type { Expression } from 'calculator/types';
import { useMemo, useState } from 'react';

type CalculatorEntry = {
  input: string;
  expression?: Expression;
  valid: boolean;
};

type CalculatorHistory = CalculatorEntry[];

const InitialHistory: CalculatorHistory = [
  {
    input: '',
    valid: false,
  },
];

export default function useCalculator() {
  const [history, setHistory] = useState<CalculatorHistory>(InitialHistory);
  const [position, setPosition] = useState<number>(0);

  function setInput(input: string) {
    setHistory(prev => {
      const newHistory = prev.slice(0, position + 1);
      try {
        const expression = parseExpression(input);
        return newHistory.concat({
          input: expression.toString(),
          expression,
          valid: true,
        });
      } catch (error) {
        return newHistory.concat({ input, valid: false });
      }
    });
    setPosition(prev => prev + 1);
  }
  const currentInput = history[position].input;
  const currentValue = `${history[position].expression?.evaluate() ?? ''}`;

  function undo() {
    setPosition(prev => Math.max(prev - 1, 0));
  }
  const canUndo = useMemo(() => position > 0, [position]);

  function redo() {
    setPosition(prev => Math.min(prev + 1, history.length - 1));
  }
  const canRedo = useMemo(
    () => position < history.length - 1,
    [position, history]
  );

  function clear() {
    setInput('');
  }
  const canClear = history[position].input !== '';

  function clearAll() {
    setHistory(InitialHistory);
    setPosition(0);
  }
  const canClearAll = history.length > 1;

  return {
    canClear,
    canClearAll,
    canRedo,
    canUndo,
    clear,
    clearAll,
    currentInput,
    currentValue,
    redo,
    setInput,
    undo,
  };
}
