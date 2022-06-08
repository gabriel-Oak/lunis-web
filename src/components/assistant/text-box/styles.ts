import { TextareaAutosize } from '@mui/base';
import { styled } from '@mui/system';

export const TextBoxContainer = styled('div')(({ theme }) => `
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translate(-50%, 0);
  background: #aaaaaa;
  border-radius: 30px;
  padding: 8px 22px;
  max-width: 600px;
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;

  ${theme.breakpoints.down('sm')} {
    width: calc(100% - 32px);
  }
`);

export const TextArea = styled(TextareaAutosize)`
  resize: none;
  flex: 1;
  font-size: 16px;
  background: #eaeaea;
  border: none;
  border-radius: 4px;
  padding: 8px 4px;
  outline: none;
`;