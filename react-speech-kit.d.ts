declare module 'react-speech-kit' {
  type SpeechSynthesis = {
    speak: (args: { text: string, voice: SpeechSynthesisVoice }) => void;
    voices: SpeechSynthesisVoice[];
    cancel: Function;
    supported: boolean;
    speaking: boolean;
  }

  type SpeechRecognition = {
    listen: Function; 
    listening: boolean;
    stop: Function;
    supported: boolean;
  }
  
  export const useSpeechSynthesis: (args?: { 
    onEnd?: Function;
  }) => SpeechSynthesis;
  export const useSpeechRecognition: (args?: {
    onResult?: (result: string) => void;
    onEnd?: Function;
  }) => SpeechRecognition;
}