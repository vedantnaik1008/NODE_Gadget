import { Request, Response } from 'express';
import zohoBooksClient from '../config/zohoBooksClient';
import { ensureGSTCompliance } from '../utils/gstHelper';

const orgId = process.env.ZOHOBOOKS_ORG_ID;

export const createInvoice = async (req: Request, res: Response) => {
    try {
        const invoicePayload = req.body;

        const response = await zohoBooksClient.post(
            '/invoices',
            invoicePayload,
            {
                params: { organization_id: orgId }
            }
        );

        res.status(201).json(response.data);
    } catch (error: any) {
        console.error('Error creating invoice:', error.response?.data || error);
        res.status(500).json({
            error: error.response?.data || 'Invoice creation failed'
        });
    }
};

export const recordPayment = async (req: Request, res: Response) => {
    try {
        const paymentPayload = req.body;

        const response = await zohoBooksClient.post(
            '/customerpayments',
            paymentPayload,
            {
                params: { organization_id: orgId }
            }
        );

        res.status(201).json(response.data);
    } catch (error: any) {
        console.error(
            'Error recording payment:',
            error.response?.data || error
        );
        res.status(500).json({
            error: error.response?.data || 'Payment recording failed'
        });
    }
};

export const createInvoiceFromWebhook = async (order: any) => {
    let invoicePayload: any = {
        customer_id: order.customer.zoho_customer_id, // example, update as needed
        line_items: order.line_items.map((item: any) => ({
            name: item.title,
            rate: item.price,
            quantity: item.quantity
        }))
        // additional fields like payment terms, tax, etc.
    };

     invoicePayload = ensureGSTCompliance(
         invoicePayload,
         order.customer.gstin,
         order.shipping_address?.province_code || 'GA'
     );

    const response = await zohoBooksClient.post('/invoices', invoicePayload, {
        params: { organization_id: process.env.ZOHOBOOKS_ORG_ID }
    });

    return response.data.invoice;
};


export const recordPaymentFromWebhook = async (payload: any) => {
    const response = await zohoBooksClient.post('/customerpayments', payload, {
        params: { organization_id: process.env.ZOHOBOOKS_ORG_ID }
    });
    return response.data.payment;
};
