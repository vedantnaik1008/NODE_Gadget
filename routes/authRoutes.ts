import { Router, Request, Response } from 'express';
import { getZohoAuthUrl } from '../auth/getAuthUrl';
import { getZohoTokens } from '../auth/getToken';
import fs from 'fs/promises';
import path from 'path';

const router = Router();

// Step 1: Redirect to Zoho login
router.get('/zoho-login', (req: Request, res: Response) => {
    const url = getZohoAuthUrl();
    res.redirect(url);
});

// Step 2: Handle callback from Zoho
router.get('/zoho/callback', async (req: Request, res: Response) => {
    const code = req.query.code as string;
    if (!code) return res.status(400).send('No auth code received');

    try {
        const { access_token, refresh_token, expires_in } = await getZohoTokens(
            code
        );
        const expires_at = Date.now() + expires_in * 1000;
        const tokenData = { access_token, refresh_token, expires_at };

        await fs.writeFile(
            path.resolve('zoho_tokens.json'),
            JSON.stringify(tokenData, null, 2)
        );
        res.send('Zoho Auth Successful! Tokens saved. You can close this tab.');
    } catch (error) {
        console.error('Error getting tokens:', error);
        res.status(500).send('Failed to get tokens');
    }
});

export default router;
