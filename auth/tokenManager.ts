import fs from 'fs/promises';
import path from 'path';
import { refreshZohoToken } from './refreshToken';

const tokenFile = path.resolve('zoho_tokens.json');

type TokenData = {
    access_token: string;
    refresh_token: string;
    expires_at: number; // timestamp in ms
};

export const getAccessToken = async (): Promise<string> => {
    const raw = await fs.readFile(tokenFile, 'utf-8');
    const tokenData: TokenData = JSON.parse(raw);
    const now = Date.now();

    if (now >= tokenData.expires_at) {
        console.log('Access token expired. Refreshing...');

        const newToken = await refreshZohoToken(tokenData.refresh_token);
        const updatedTokenData: TokenData = {
            ...tokenData,
            access_token: newToken.access_token,
            expires_at: now + newToken.expires_in * 1000
        };

        await fs.writeFile(
            tokenFile,
            JSON.stringify(updatedTokenData, null, 2)
        );
        return updatedTokenData.access_token;
    }

    return tokenData.access_token;
};
