import { ChangeEvent, ChangeEventHandler, FC, useRef, useState } from 'react';
import { useAssistant } from '../AssistantContext';
import SendIcon from '@mui/icons-material/Send';
import { TextArea, TextBoxContainer } from './styles';
import { IconButton } from '@mui/material';

const TextBox: FC = () => {
  const [text, setText] = useState('');
  const { sendSpeech } = useAssistant();
  const textRef = useRef<HTMLTextAreaElement>(null);

  const submitText = () => {
    if (!text) return;
    
    sendSpeech(text);
    setText('');
    textRef?.current?.focus();
  }

  const handleChange = ({ target, nativeEvent }: any) => {
    if (nativeEvent.inputType === 'insertLineBreak') 
      return submitText();
    setText(target.value);
  }

  return (
    <TextBoxContainer>
      <TextArea
        ref={textRef}
        autoCapitalize="sentences"
        value={text}
        onChange={handleChange}
      />

      <IconButton onClick={submitText}>
        <SendIcon />
      </IconButton>
    </TextBoxContainer>
  );
}

export default TextBox;