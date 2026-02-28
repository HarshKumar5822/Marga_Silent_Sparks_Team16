import axios from 'axios';

// Node 17+ and modern browsers sometimes block 'localhost' due to IPv6 routing. 
// Using 127.0.0.1 explicitly forces IPv4 routing and prevents 'Failed to Fetch' CORS errors.
const API_URL = import.meta.env.VITE_API_URL || 'https://marga-silent-sparks-team16-2.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the token if it exists
api.interceptors.request.use(
    (config) => {
        const userInfoStr = localStorage.getItem('userInfo');
        const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
        const token = userInfo?.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
