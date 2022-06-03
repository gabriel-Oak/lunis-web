import { TextareaAutosize } from '@mui/base';
import { IconButton } from '@mui/material';
import { styled } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';

export const TextBoxContainer = styled('div')`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translate(-50%, 0);
  background: #aaaaaa;
  width: 100%;
  border-radius: 30px;
  padding: 8px 22px;
  max-width: 600px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

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