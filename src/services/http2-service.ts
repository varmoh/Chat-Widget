import axios from 'axios';
import { RuuterV2Response } from '../model/ruuter-v2-response-model';

const http = axios.create({
  baseURL: window._env_.RUUTER_2_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

http.interceptors.response.use((response) => {
  if (response.status !== 200) return Promise.reject(response);
  const ruuterResponse = response.data as RuuterV2Response;
  if (ruuterResponse.response) return ruuterResponse.response;
  return response;
});

export default http;
