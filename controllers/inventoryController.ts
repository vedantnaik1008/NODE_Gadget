import { Request, Response } from 'express';
import zohoClient from '../config/zohoClient';

const orgId = process.env.ZOHOINVENTORY_ORG_ID;

export const getItems = async (req: Request, res: Response) => {
    try {
        const response = await zohoClient.get('/items', {
            params: {
                organization_id: `${orgId}`
            }
        });
        res.status(200).json(response.data);
    } catch (error: any) {
        res.status(500).json({
            error: error.response?.data || 'Failed to fetch items'
        });
    }
};

export const createItem = async (req: Request, res: Response) => {
    try {
        const response = await zohoClient.post('/items', req.body, {
            params: {
                organization_id: `${orgId}`
            }
        });
        res.status(201).json(response.data);
    } catch (error: any) {
        res.status(500).json({
            error: error.response?.data || 'Failed to create item'
        });
    }
};
