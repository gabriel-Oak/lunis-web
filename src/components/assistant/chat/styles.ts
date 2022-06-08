import { styled } from '@mui/system';

const config = { shouldForwardProp: (prop: any) => prop !== 'isUser' };

export const ChantContainer = styled('div')`
  position: relative;
  height: 100vh;
  border-radius: 8px;
  padding: 8px 0 80px;
  overflow-y: auto;
`;

export const Row = styled('section', config)`
  display: inline-flex;
  width: 100%;
  padding: 8px 16px;
  justify-content: ${(props: { isUser: boolean }) => props.isUser && 'flex-end'};
`;

export const DialogueContainer = styled('div', config)<{isUser: boolean}>(({ theme, isUser }) => `  
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${isUser
    ? '#0b54ff'
    : '#e1e1e1'};
  color:  ${isUser && 'white'};
  max-width: 60%;

  ${theme.breakpoints.down('sm')} {
    max-width: 80%;
  }
`);

export const ParagraphContainer = styled('p')`
  margin: 0;
`;
