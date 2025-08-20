import { styled } from '@linaria/react';
import AssemblyInput from 'assembly/AssemblyInput';
import {
  AssemblyIconButton,
  AssemblyPrimaryButton,
  AssemblySecondaryButton,
} from 'assembly/buttons';
import { AssemblyPrimaryButtonVariant } from 'assembly/buttons/types';
import { RefSpacing } from 'assembly/foundations/designsystem/web/RefSpacing';
import { BinaryOperator } from 'calculator/types';
import CalculatorResult from 'components/tools/calculator/CalculatorResult';
import useCalculator from 'hooks/tools/useCalculator';
import { rem } from 'polished';

const CalculatorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${RefSpacing.large};
`;

const CalculatorBox = styled.div`
  width: ${rem(600)};
`;

const CalculatorRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: ${RefSpacing.xSmall} 0;
`;

const CalculatorInputWrapper = styled.div`
  min-width: ${rem(400)};
`;

const CalculatorResultWrapper = styled.div`
  min-width: ${rem(100)};
`;

export default function Calculator() {
  const {
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
  } = useCalculator();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  function handleButtonClick(value: string) {
    setInput(currentInput + value);
  }

  return (
    <CalculatorWrapper>
      <CalculatorBox>
        <CalculatorRow>
          <CalculatorInputWrapper>
            <AssemblyInput
              autoFocus={true}
              label="Expression"
              onChange={handleInputChange}
              placeholder="Enter or paste an expression to evaluate."
              value={currentInput}
            />
          </CalculatorInputWrapper>
          <CalculatorResultWrapper>
            <CalculatorResult value={currentValue} />
          </CalculatorResultWrapper>
        </CalculatorRow>
        <CalculatorRow>
          <AssemblyPrimaryButton
            onClick={() => handleButtonClick('7')}
            text="7"
          />
          <AssemblyPrimaryButton
            onClick={() => handleButtonClick('8')}
            text="8"
          />
          <AssemblyPrimaryButton
            onClick={() => handleButtonClick('9')}
            text="9"
          />
          <AssemblyPrimaryButton
            onClick={() => handleButtonClick(BinaryOperator.ADD)}
            text={BinaryOperator.ADD}
            variant={AssemblyPrimaryButtonVariant.UPGRADE}
          />
          <AssemblySecondaryButton
            disabled={!canClear}
            onClick={clear}
            text="Clear"
          />
        </CalculatorRow>
        <CalculatorRow>
          <AssemblyPrimaryButton
            onClick={() => handleButtonClick('4')}
            text="4"
          />
          <AssemblyPrimaryButton
            onClick={() => handleButtonClick('5')}
            text="5"
          />
          <AssemblyPrimaryButton
            onClick={() => handleButtonClick('6')}
            text="6"
          />
          <AssemblyPrimaryButton
            onClick={() => handleButtonClick(BinaryOperator.SUBTRACT)}
            text={BinaryOperator.SUBTRACT}
            variant={AssemblyPrimaryButtonVariant.UPGRADE}
          />
          <AssemblySecondaryButton
            disabled={!canClearAll}
            onClick={clearAll}
            text="Clear All"
          />
        </CalculatorRow>
        <CalculatorRow>
          <AssemblyPrimaryButton
            onClick={() => handleButtonClick('1')}
            text="1"
          />
          <AssemblyPrimaryButton
            onClick={() => handleButtonClick('2')}
            text="2"
          />
          <AssemblyPrimaryButton
            onClick={() => handleButtonClick('3')}
            text="3"
          />
          <AssemblyPrimaryButton
            onClick={() => handleButtonClick(BinaryOperator.MULTIPLY)}
            text={BinaryOperator.MULTIPLY}
            variant={AssemblyPrimaryButtonVariant.UPGRADE}
          />
        </CalculatorRow>
        <CalculatorRow>
          <AssemblyPrimaryButton text="0" />
          <AssemblyIconButton disabled={!canUndo} icon="undo" onClick={undo} />
          <AssemblyIconButton
            disabled={!canRedo}
            icon="refresh"
            onClick={redo}
          />
          <AssemblyPrimaryButton
            onClick={() => handleButtonClick(BinaryOperator.DIVIDE)}
            text={BinaryOperator.DIVIDE}
            variant={AssemblyPrimaryButtonVariant.UPGRADE}
          />
        </CalculatorRow>
      </CalculatorBox>
    </CalculatorWrapper>
  );
}
