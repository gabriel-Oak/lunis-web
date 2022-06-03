import axios from 'axios';
import * as config from 'next/config';

const envs = config.default().publicRuntimeConfig;
const apiService = axios.create({
  baseURL: envs.lunisApi,
});

apiService.interceptors.response.use(
  (response) => response.data,
  ({response}) => {
    throw {
      messages: response?.data?.messages || ['Desculpe, não consegui me conectar com a nuvem.'],
      path: response?.data?.path,
    };
  },
);

export default apiService;