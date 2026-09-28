import type { CollectionConfig } from 'payload';

export const WholesaleRFQs: CollectionConfig = {
  slug: 'wholesale-rfqs',
  admin: {
    useAsTitle: 'buyerName',
    group: 'B2B Inquiries & Leads',
    defaultColumns: ['buyerName', 'brand', 'phone', 'volume', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'buyerName',
      type: 'text',
      required: true,
      label: 'Procurement Manager / Buyer Name',
    },
    {
      name: 'brand',
      type: 'text',
      label: 'Chain / Enterprise Brand Name',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone / WhatsApp Contact',
    },
    {
      name: 'volume',
      type: 'select',
      defaultValue: '10000',
      options: [
        { label: '5,000 to 10,000 pcs (Carton LCL)', value: '5000' },
        { label: '10,000 to 25,000 pcs (Standard Wholesale)', value: '10000' },
        { label: '25,000 to 50,000 pcs (Regional Distributor)', value: '25000' },
        { label: '50,000 to 100,000+ pcs (20ft Container Load)', value: '50000' },
        { label: '200,000+ pcs (40ft High Cube Container Export)', value: '200000' },
      ],
      required: true,
      label: 'Monthly Procurement Volume',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new_lead',
      options: [
        { label: '⚡ New Inquiry (Action Needed)', value: 'new_lead' },
        { label: '📑 Proforma Quote Sent', value: 'quote_sent' },
        { label: '🤝 Negotiation / Sample Stage', value: 'in_negotiation' },
        { label: '💼 Commercial PO Issued', value: 'po_issued' },
        { label: '✅ Order Dispatched & Closed', value: 'closed_won' },
        { label: '❌ Inactive / Lost', value: 'lost' },
      ],
      required: true,
    },
    {
      name: 'destinationPort',
      type: 'text',
      label: 'Delivery City or Sea Port of Discharge (FOB/CIF)',
    },
    {
      name: 'quotedAmount',
      type: 'text',
      label: 'Total Quoted Amount (e.g. ₹1,45,000 or $12,500)',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Custom Requirements, Embossing or Delivery Notes',
    },
  ],
};
