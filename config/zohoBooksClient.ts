import axios from 'axios';
import { getAccessToken } from '../auth/tokenManager';

const zohoBooksClient = axios.create({
    baseURL: 'https://www.zohoapis.in/books/v3',
    headers: { 'Content-Type': 'application/json' }
});

zohoBooksClient.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    config.headers.Authorization = `Zoho-oauthtoken ${token}`;
    return config;
});

export default zohoBooksClient;
