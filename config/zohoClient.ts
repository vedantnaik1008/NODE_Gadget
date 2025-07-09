import axios from 'axios';
import { getAccessToken } from '../auth/tokenManager';

const zohoClient = axios.create({
    baseURL: 'https://www.zohoapis.in/inventory/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

zohoClient.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    config.headers.Authorization = `Zoho-oauthtoken ${token}`;
    return config;
});

export default zohoClient;
