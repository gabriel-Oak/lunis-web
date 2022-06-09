import { TextareaAutosize } from '@mui/base';
import { IconButton } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import MicIcon from '@mui/icons-material/Mic';

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

export const bouncing = keyframes`
  from {
    transform: scale(0.9); 
  }
  to { 
    transform: scale(1.1);
  }
`;

export const RecordingIcon = styled(MicIcon)`
  animation: ${bouncing} 300ms infinite alternate;
`;
