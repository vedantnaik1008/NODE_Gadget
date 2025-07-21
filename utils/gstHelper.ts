export function ensureGSTCompliance(
    invoice: any,
    customerGSTIN: string,
    stateCode: string
) {
    if (invoice.total >= 50000) {
        if (!customerGSTIN)
            throw new Error('GSTIN required for invoices above ₹50,000');

        invoice.place_of_supply = stateCode;
        invoice.gst_treatment = 'business_gst';
        invoice.tax_treatment = 'GST Registered Regular';
    }
    return invoice;
}
