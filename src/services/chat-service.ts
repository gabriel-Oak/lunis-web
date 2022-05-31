import apiService from './api-service';

export const postSpeech = (speech: string): Promise<{
  messages: string[];
  path?: string;
}> => apiService.post('/processor', {
  speech,
});