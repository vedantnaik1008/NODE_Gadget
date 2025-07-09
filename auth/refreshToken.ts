import axios from 'axios';

export const refreshZohoToken = async (refreshToken: string) => {
    const url = 'https://accounts.zoho.in/oauth/v2/token';

    const response = await axios.post(url, null, {
        params: {
            refresh_token: refreshToken,
            client_id: process.env.ZOHO_CLIENT_ID,
            client_secret: process.env.ZOHO_CLIENT_SECRET,
            grant_type: 'refresh_token'
        }
    });

    const { access_token, expires_in } = response.data;

    return {
        access_token,
        expires_in
    };
};
