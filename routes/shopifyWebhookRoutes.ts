import { Router, Request, Response } from 'express';
import { createInvoiceFromWebhook, recordPaymentFromWebhook } from '../controllers/zohoBooksController';

const router = Router();

router.post('/shopify/order', async (req: Request, res: Response) => {
    try {
        const order = req.body;

        const customerName = `${order.customer.first_name} ${order.customer.last_name}`;
        const customerEmail = order.customer.email;

        const line_items = order.line_items.map((item: any) => ({
            name: item.name,
            rate: item.price,
            quantity: item.quantity
        }));

        const invoicePayload = {
            customer_name: customerName,
            customer_email: customerEmail,
            line_items,
            reference_number: order.order_number,
            date: new Date().toISOString().split('T')[0],
            currency_code: order.currency || 'INR'
        };

        // 👉 Send invoice to Zoho Books
        const invoice = await createInvoiceFromWebhook(invoicePayload);

        // 👉 Record payment if paid
        if (order.financial_status === 'paid') {
            const paymentPayload = {
                customer_id: invoice.customer_id,
                amount: invoice.total,
                invoice_id: invoice.invoice_id,
                payment_mode: 'Cash',
                date: new Date().toISOString().split('T')[0]
            };

            await recordPaymentFromWebhook(paymentPayload);
        }

        res.status(200).json({ success: true });
    } catch (error: any) {
        console.error('Webhook error:', error.message || error);
        res.status(500).json({ error: 'Webhook handling failed' });
    }
});

export default router;
