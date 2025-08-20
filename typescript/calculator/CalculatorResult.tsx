import { styled } from '@linaria/react';
import { ThemedColor } from 'assembly/foundations/Color';
import { Subheading } from 'assembly/foundations/Typography';
import { RefRadius } from 'assembly/foundations/designsystem/web/RefRadius';
import { RefSpacing } from 'assembly/foundations/designsystem/web/RefSpacing';

const CalculatorResultBox = styled.div`
  background-color: ${ThemedColor.Gray200Gray700};
  padding: ${RefSpacing.xxSmall} ${RefSpacing.small};
  height: 3rem;
  border-radius: ${RefRadius.medium};
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${ThemedColor.Gray600Gray400};
`;

const CalculatorResultContent = styled.div`
  ${Subheading.Three}
`;

export default function CalculatorResult({ value }: { value: string }) {
  return (
    <CalculatorResultBox>
      <CalculatorResultContent>{value}</CalculatorResultContent>
    </CalculatorResultBox>
  );
}
