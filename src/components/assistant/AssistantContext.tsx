import { ComponentType, createContext, FC, MutableRefObject, useContext, useMemo, useRef, useState } from 'react';
import { postSpeech } from '../../services/chat-service';
import { useSpeechSynthesis } from 'react-speech-kit';

export interface ChatMessage {
  author: 'assistant' | 'user';
  messages: string[];
  isError?: boolean;
}

export interface AssistantProps {
  loadingSpeech: boolean;
  entries: ChatMessage[];
  isStarted: boolean;
  containerRef: MutableRefObject<HTMLDivElement | undefined>;
  startLunis: () => void;
  scrollChat: () => void;
  sendSpeech: (speech: string) => Promise<void>;
}

export const AssistantContext = createContext(null as unknown as AssistantProps);

export const AssistantProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [entries, setEntries] = useState([] as ChatMessage[]);
  const [loadingSpeech, setLoadingSpeech] = useState(false);

  const containerRef = useRef<HTMLDivElement>();

  const scrollChat = () => {
    const { current } = containerRef;
    if (!current) return;

    const scrollDistance = current.scrollHeight - current.scrollTop - current.clientHeight;
    current.scrollBy({ behavior: 'smooth', top: scrollDistance });
  }

  const { speak, voices, cancel } = useSpeechSynthesis({ onEnd: scrollChat });

  const voice = useMemo(
    () => voices
      .find((voice: any) => voice.lang === 'pt-BR') as SpeechSynthesisVoice,
    [voices],
  );

  const synthesisSpeak = (
    messages: string[],
    oldEntries: ChatMessage[],
    isError?: boolean,
  ) => {
    setEntries(oldEntries.concat([{ messages, author: 'assistant', isError }]));
    messages
      .forEach((message) => speak({ text: message, voice, }));
  }

  const sendSpeech = async (speech: string) => {
    const newEntries = Array.from(entries);
    newEntries.push({ messages: [speech], author: 'user' });
    const stops = ['para', 'cancela', 'cancelar', 'pare', 'cala a boca'];

    setEntries(newEntries);
    setLoadingSpeech(true);

    if (stops.indexOf(speech.toLowerCase()) > -1) {
      cancel();
      return synthesisSpeak(['Okay :/'], newEntries);
    }

    try {
      const { messages } = await postSpeech(speech);
      synthesisSpeak(messages, newEntries);
    } catch (error: any) {
      synthesisSpeak(error.messages, newEntries, true);
    }
    setLoadingSpeech(false);
  }

  const startLunis = () => {
    setIsStarted(true);
    const messages = ['Olá!', 'Eu sou lúnis. Como posso ajudar?'];
    synthesisSpeak(messages, entries);
  }

  return (
    <AssistantContext.Provider value={{
      entries,
      loadingSpeech,
      isStarted,
      containerRef,
      startLunis,
      sendSpeech,
      scrollChat,
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
