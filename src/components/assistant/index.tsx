import { FC } from 'react';
import { useAssistant, withAssistant } from './AssistantContext';
import Chat from './chat';
import { StartButton } from './styles';

const Assistant: FC = () => {
  const { startLunis, isStarted } = useAssistant();

  return (
    <div>
      {!isStarted ? (
        <StartButton onClick={startLunis} variant="outlined">
          Iniciar
        </StartButton>
      ) : (
        <Chat />
      )}
    </div>
  );
}

export default withAssistant(Assistant);