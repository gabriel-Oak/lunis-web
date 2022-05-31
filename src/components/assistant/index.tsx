import { Button } from '@mui/material';
import { FC, useEffect } from 'react';
import apiService from '../../services/api-service';
import { useAssistant, withAssistant } from './AssistantContext';
import { ChantContainer } from './styles';

const Assistant: FC = () => {
  const { entries, sendSpeech } = useAssistant();

  useEffect(() => {
    sendSpeech('conte uma piada de loira');
  }, []);

  return (
    <div>
      <ChantContainer>
        {entries.map((entry, index) => (
          <div key={index}>
            {entry.messages.map((speech) => (
              <p key={speech}>
                {speech}
              </p>
            ))}
          </div>
        ))}
      </ChantContainer>
    </div>
  );
}

export default withAssistant(Assistant);