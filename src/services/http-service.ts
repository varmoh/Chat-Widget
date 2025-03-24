import axios from 'axios';
import { RuuterResponse } from '../model/ruuter-response-model';

const http = axios.create({
  baseURL: window._env_.RUUTER_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  },
  withCredentials: true,
});

http.interceptors.response.use((response: any) => {
  if (response.status !== 200) return Promise.reject(new Error(`Error: ${response}`));
  const ruuterResponse = response.data as RuuterResponse;
  if (ruuterResponse.response) return ruuterResponse.response;
  return response;
});

export default http;
