import { act, renderHook } from '@testing-library/react';
import useCalculator from 'hooks/tools/useCalculator';

describe('useCalculator', () => {
  it('should return the correct initial state', () => {
    const { result } = renderHook(() => useCalculator());

    expect(result.current.canClear).toBe(false);
    expect(result.current.canClearAll).toBe(false);
    expect(result.current.canRedo).toBe(false);
    expect(result.current.canUndo).toBe(false);
    expect(result.current.currentInput).toBe('');
    expect(result.current.currentValue).toBe('');
  });

  it.each([
    ['1+2', '1 + 2', '3'],
    ['1 + 2+', '1 + 2+', ''],
    ['2(4+3)', '2 × (4 + 3)', '14'],
  ])(
    'should update the input',
    (input: string, expectedInput: string, expectedValue: string) => {
      const { result } = renderHook(() => useCalculator());

      act(() => result.current.setInput(input));

      expect(result.current.currentInput).toBe(expectedInput);
      expect(result.current.currentValue).toBe(expectedValue);
    }
  );

  it('should undo and redo', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => result.current.setInput('1+2'));
    expect(result.current.currentInput).toBe('1 + 2');
    expect(result.current.currentValue).toBe('3');
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);

    act(() => result.current.setInput('1 + 2+'));
    expect(result.current.currentInput).toBe('1 + 2+');
    expect(result.current.currentValue).toBe('');
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);

    act(() => result.current.undo());
    expect(result.current.currentInput).toBe('1 + 2');
    expect(result.current.currentValue).toBe('3');
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(true);

    act(() => result.current.undo());
    expect(result.current.currentInput).toBe('');
    expect(result.current.currentValue).toBe('');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(true);

    act(() => result.current.redo());
    expect(result.current.currentInput).toBe('1 + 2');
    expect(result.current.currentValue).toBe('3');
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(true);

    act(() => result.current.redo());
    expect(result.current.currentInput).toBe('1 + 2+');
    expect(result.current.currentValue).toBe('');
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
  });

  it('should clear', () => {
    const { result } = renderHook(() => useCalculator());

    act(() => result.current.setInput('1+2'));
    act(() => result.current.clear());

    expect(result.current.currentInput).toBe('');
    expect(result.current.currentValue).toBe('');
    expect(result.current.canClear).toBe(false);
    expect(result.current.canUndo).toBe(true);
  });

  it('should clear all', () => {
    const { result } = renderHook(() => useCalculator());
    expect(result.current.canClearAll).toBe(false);
    expect(result.current.currentInput).toBe('');
    expect(result.current.currentValue).toBe('');
    expect(result.current.canClearAll).toBe(false);
    expect(result.current.canUndo).toBe(false);

    act(() => result.current.setInput('1+2'));
    expect(result.current.currentInput).toBe('1 + 2');
    expect(result.current.currentValue).toBe('3');
    expect(result.current.canClearAll).toBe(true);
    expect(result.current.canUndo).toBe(true);

    act(() => result.current.clearAll());
    expect(result.current.currentInput).toBe('');
    expect(result.current.currentValue).toBe('');
    expect(result.current.canClearAll).toBe(false);
    expect(result.current.canUndo).toBe(false);
  });
});
