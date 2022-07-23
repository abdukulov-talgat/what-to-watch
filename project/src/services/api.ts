import axios from 'axios';
import { getToken } from './token';


const BASE_URL = 'https://10.react.pages.academy/wtw';
const TIMEOUT = 5000;

function createAPI() {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    }
  );

  return api;
}

export { createAPI };
