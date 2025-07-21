import { Router } from 'express';
import {
    createInvoice,
    recordPayment
} from '../controllers/zohoBooksController';

const router = Router();

router.post('/invoices', createInvoice);
router.post('/payments', recordPayment);

export default router;
