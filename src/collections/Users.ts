import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Administration',
    defaultColumns: ['email', 'name', 'role', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'admin',
      options: [
        { label: 'Super Admin (Full Access)', value: 'admin' },
        { label: 'B2B Trade Buyer', value: 'buyer' },
      ],
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company / Brand Name',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone / WhatsApp',
    },
  ],
};
