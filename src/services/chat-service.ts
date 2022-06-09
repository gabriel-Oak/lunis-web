import apiService from './api-service';

export const postSpeech = (payload: { speech: string, path?: string }): Promise<{
  messages: string[];
  path?: string;
}> => apiService.post('/processor', payload);