import { ComponentType, createContext, Dispatch, FC, MutableRefObject, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { postSpeech } from '../../services/chat-service';
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit';
import generalIntents, { IntentInterface, pickAnswer } from '../../utils/general-intents';

export interface ChatMessage {
  author: 'assistant' | 'user';
  messages: string[];
  isError?: boolean;
}

export interface AssistantProps {
  loadingSpeech: boolean;
  entries: ChatMessage[];
  isStarted: boolean;
  containerRef: MutableRefObject<HTMLDivElement>;
  textRef: MutableRefObject<HTMLTextAreaElement>,
  text: string;
  listening: boolean;
  supportedListening: boolean;
  stop: Function;
  listen: () => void;
  setText: Dispatch<SetStateAction<string>>;
  startLunis: () => void;
  scrollChat: () => void;
  submitText: () => void;
  sendSpeech: (speech: string) => Promise<void>;
}

export const AssistantContext = createContext(null as unknown as AssistantProps);

export const AssistantProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [text, setText] = useState('');
  const [responsePath, setResponsePath] = useState('');
  const [entries, setEntries] = useState([] as ChatMessage[]);
  const [loadingSpeech, setLoadingSpeech] = useState(false);
  const [recognitionTimeout, setRecognitionTimeout] = useState<NodeJS.Timeout>();

  const containerRef = useRef(null as unknown as HTMLDivElement);
  const textRef = useRef(null as unknown as HTMLTextAreaElement);
  const { speak, voices, cancel, supported , speaking } = useSpeechSynthesis();
  const voice = useMemo(
    () => voices
      .find((voice: any) => voice.lang === 'pt-BR') as SpeechSynthesisVoice,
    [voices],
  );  

  const submitText = () => {
    if (!text) return;

    sendSpeech(text);
    setText('');
    textRef?.current?.focus();
  }

  const {
    listen: listentHook, listening, stop, supported: supportedListening,
  } = useSpeechRecognition({
    onResult: setText,
    onEnd: submitText,
  });
  const listen = () => {
    if(listening) return; 
    cancel();
    listentHook({ lang: 'pt-BR' });
  }

  useEffect(() => {
    if (!listening) return;
    clearTimeout(recognitionTimeout);
    setRecognitionTimeout(setTimeout(() => stop(), 1000));
  }, [text]);

  useEffect(() => {
    if (responsePath && !speaking) listen();
  }, [speaking, responsePath]);

  const scrollChat = () => {
    const { current } = containerRef;
    if (!current) return;

    const scrollDistance = current.scrollHeight - current.scrollTop - current.clientHeight;
    current.scrollBy({ behavior: 'smooth', top: scrollDistance });
  }

  const synthesisSpeak = ({
    messages,
    oldEntries,
    path = '',
    isError,
  }: {
    messages: string[],
    oldEntries: ChatMessage[],
    path?: string,
    isError?: boolean,
  }) => {
    setEntries(oldEntries.concat([{ messages, author: 'assistant', isError }]));
    setResponsePath(path);
    messages
      .forEach((message) => speak({ text: message, voice, }));
  }

  const sendSpeech = async (speech: string) => {
    const oldEntries = Array.from(entries);
    oldEntries.push({ messages: [speech], author: 'user' });

    setEntries(oldEntries);
    setLoadingSpeech(true);

    try {
      const { messages, path } = await postSpeech({ speech, path: responsePath });
      cancel();
      synthesisSpeak({ messages, oldEntries, path });
    } catch (error: any) {
      if (error.messages) synthesisSpeak({
        messages: error.messages,
        oldEntries,
        isError: true,
        path: error.path
      });
    }
    setLoadingSpeech(false);
  }

  const startLunis = () => {
    setIsStarted(true);
    const start = generalIntents
      .find((i) => i.name === 'start') as IntentInterface;
    const messages = [pickAnswer(start)];
    
    const unsuported = generalIntents
      .find((i) => i.name === 'unsuported') as IntentInterface;
    if (!supported) messages.push(pickAnswer(unsuported));

    const unsuportedListening = generalIntents
      .find((i) => i.name === 'unsuported-listening') as IntentInterface;
    if (!supportedListening) messages.push(pickAnswer(unsuportedListening));

    synthesisSpeak({ messages, oldEntries: entries });
  }

  return (
    <AssistantContext.Provider value={{
      entries,
      loadingSpeech,
      isStarted,
      containerRef,
      textRef,
      text,
      listen,
      listening,
      stop,
      supportedListening,
      submitText,
      setText,
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
