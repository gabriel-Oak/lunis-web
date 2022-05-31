import { ComponentType, createContext, FC, useContext, useState } from 'react';
import { postSpeech } from '../../services/chat-service';

export interface ChatMessage {
  author: 'assistant' | 'user';
  messages: string[];
  isError?: boolean;
}

export interface AssistantProps {
  loadingSpeech: boolean;
  entries: ChatMessage[];
  sendSpeech: (speech: string) => Promise<void>;
}

export const AssistantContext = createContext(null as unknown as AssistantProps);

export const AssistantProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [entries, setEntries] = useState([] as ChatMessage[]);
  const [loadingSpeech, setLoadingSpeech] = useState(false);

  const sendSpeech = async (speech: string) => {
    setLoadingSpeech(true);
    try {
      const { messages } = await postSpeech(speech);
      setEntries([...entries, { messages, author: 'assistant' }]);
    } catch (error: any) {
      setEntries([...entries, { ...error, isError: true, author: 'assistant' }]);
    }
    setLoadingSpeech(false);
  }

  return (
    <AssistantContext.Provider value={{
      entries,
      loadingSpeech,
      sendSpeech,
    }}>
      {children}
    </AssistantContext.Provider>
  );
}

export const withAssistant = (Component: ComponentType) => (other: any) => (
  <AssistantProvider>
    <Component {...other} />
  </AssistantProvider>
);

export const useAssistant = () => useContext(AssistantContext);
