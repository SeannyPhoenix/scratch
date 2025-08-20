import { styled } from '@linaria/react';
import { Heading } from 'assembly/foundations/Typography';
import { RefSpacing } from 'assembly/foundations/designsystem/web/RefSpacing';

export const ToolHeader = styled.div`
  ${Heading.One}

  margin: ${RefSpacing.large} 0;
`;
