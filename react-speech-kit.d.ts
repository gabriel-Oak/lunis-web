declare module 'react-speech-kit' {
  type SpeechSynthesis = {
    speak: (args: { text: string, voice: SpeechSynthesisVoice }) => void;
    voices: SpeechSynthesisVoice[];
    cancel: Function;
  }
  export const useSpeechSynthesis: (args?: { onEnd?: Function; }) => SpeechSynthesis;
}