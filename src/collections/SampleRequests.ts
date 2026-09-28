import type { CollectionConfig } from 'payload';

export const SampleRequests: CollectionConfig = {
  slug: 'sample-requests',
  admin: {
    useAsTitle: 'buyerName',
    group: 'B2B Inquiries & Leads',
    defaultColumns: ['buyerName', 'company', 'phone', 'status', 'createdAt'],
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
      label: 'Buyer Name',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Hotel / Restaurant / Brand Name',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Mobile / WhatsApp Number',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending_dispatch',
      options: [
        { label: '📦 New Request (Pending Dispatch)', value: 'pending_dispatch' },
        { label: '🚚 Dispatched via Courier', value: 'dispatched' },
        { label: '✅ Delivered to Buyer', value: 'delivered' },
        { label: '❌ Cancelled / Invalid', value: 'cancelled' },
      ],
      required: true,
    },
    {
      name: 'courierAddress',
      type: 'textarea',
      required: true,
      label: 'Complete Courier Delivery Address',
    },
    {
      name: 'city',
      type: 'text',
      label: 'City & State',
    },
    {
      name: 'pincode',
      type: 'text',
      label: 'PIN / Postal Code',
    },
    {
      name: 'trackingNumber',
      type: 'text',
      label: 'Courier AWB / Tracking Number',
    },
    {
      name: 'selectedProducts',
      type: 'array',
      label: 'Products Requested in Sample Box (Up to 6)',
      fields: [
        { name: 'productTitle', type: 'text', label: 'Item Name' },
        { name: 'productSku', type: 'text', label: 'Item SKU / ID' },
      ],
    },
  ],
};
