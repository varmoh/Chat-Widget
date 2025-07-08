import axios from 'axios';
import { RuuterResponse } from '../model/ruuter-response-model';

const notificationHttp = axios.create({
    baseURL: window._env_.NOTIFICATION_NODE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
    withCredentials: false,
});

notificationHttp.interceptors.response.use((response: any) => {
    if (response.status !== 200) return Promise.reject(new Error(`Error: ${response}`));
    const notificationResponse = response.data as RuuterResponse;
    if (notificationResponse.response) return notificationResponse.response;
    return response;
});

export default notificationHttp;
