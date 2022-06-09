import { FC } from 'react';
import { useAssistant } from '../AssistantContext';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';

import { RecordingIcon, TextArea, TextBoxContainer } from './styles';

const TextBox: FC = () => {
  const {
    submitText, textRef, text, setText, supportedListening, listen, stop,
    listening,
  } = useAssistant();

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

      {(text && !listening) || !supportedListening ? (
        <IconButton onClick={submitText}>
          <SendIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={listen}
          color={listening ? 'primary' : 'default'}
        >
          {listening ? <RecordingIcon /> : <MicIcon />}
        </IconButton>
      )}

    </TextBoxContainer>
  );
}

export default TextBox;