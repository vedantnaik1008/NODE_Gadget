import axios from 'axios';

export const getZohoTokens = async (code: string) => {
    const url = 'https://accounts.zoho.com/oauth/v2/token';

    const response = await axios.post(url, null, {
        params: {
            code,
            client_id: process.env.ZOHO_CLIENT_ID,
            client_secret: process.env.ZOHO_CLIENT_SECRET,
            redirect_uri: process.env.ZOHO_REDIRECT_URI,
            grant_type: 'authorization_code'
        }
    });

    const { access_token, refresh_token, expires_in } = response.data;

    return {
        access_token,
        refresh_token,
        expires_in
    };
};
