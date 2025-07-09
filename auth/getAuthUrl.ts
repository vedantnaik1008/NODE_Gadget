const clientId = process.env.ZOHO_CLIENT_ID!;
const redirectUri = process.env.ZOHO_REDIRECT_URI!;
const scope = 'ZohoInventory.fullaccess.all';
const responseType = 'code';
const accessType = 'offline';
const prompt = 'consent';

export const getZohoAuthUrl = (): string => {
    const base = 'https://accounts.zoho.com/oauth/v2/auth';
    const params = new URLSearchParams({
        scope,
        client_id: clientId,
        response_type: responseType,
        access_type: accessType,
        redirect_uri: redirectUri,
        prompt
    });

    return `${base}?${params.toString()}`;
};
