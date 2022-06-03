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

export const DialogueContainer = styled('div', config)`  
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${(props: { isUser: boolean }) => props.isUser
    ? '#0b54ff'
    : '#e1e1e1'};
  color:  ${(props: { isUser: boolean }) => props.isUser && 'white'};
  max-width: 60%;
`;

export const ParagraphContainer = styled('p')`
  margin: 0;
`;

export const TextBoxContainer = styled('div')`
  position: absolute;
  background: ;
  bottom: 16px;
  left: 50%;
  transform: translate(-50%, 0);
  background: white;
  min-height: 60px;
  width: 100%;
  border-radius: 30px;
  padding: 8px 16px;
  max-width: 600px;
`;