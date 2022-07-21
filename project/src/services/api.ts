import axios, { AxiosError } from 'axios';
import { getToken } from './token';


type OnauthorizedCallback = () => void;

const BASE_URL = 'https://10.react.pages.academy/wtw';
const TIMEOUT = 5000;

function createApi(callback: OnauthorizedCallback) {
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

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        return callback();
      }

      return Promise.reject(error);
    }
  );
}

export { createApi };
