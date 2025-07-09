import { Router } from 'express';
import { getItems, createItem } from '../controllers/inventoryController';
import { getZohoAuthUrl } from '../auth/getAuthUrl';

const router = Router();

router.get('/auth/zoho-login', (req, res) => {
    const url = getZohoAuthUrl();
    res.redirect(url);
});

router.get('/items', getItems);
router.post('/items', createItem);

export default router;
