import axios from 'axios';
import { RuuterResponse } from '../model/ruuter-response-model';

const http = axios.create({
  baseURL: window._env_.RUUTER_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

http.interceptors.response.use((response) => {
  if (response.status !== 200) return Promise.reject(response);
  const ruuterResponse = response.data as RuuterResponse;
  if (ruuterResponse.response) return ruuterResponse.response;
  return response;
});

export default http;
