import type { CollectionConfig } from 'payload';

export const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  admin: {
    useAsTitle: 'companyName',
    group: 'Website & SEO',
    defaultColumns: ['companyName', 'phone', 'email', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
      defaultValue: 'Ecolates Eco Solutions Pvt. Ltd.',
      label: 'Company Brand Name',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'India’s Premier Sugarcane Bagasse Tableware Manufacturer',
      label: 'Brand Tagline',
    },
    {
      name: 'phone',
      type: 'text',
      defaultValue: '+91 90999 12345',
      label: 'Main Sales Phone Number',
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      defaultValue: '+91 90999 12345',
      label: 'WhatsApp B2B Support Number (with country code)',
    },
    {
      name: 'email',
      type: 'text',
      defaultValue: 'sales@ecolates.com',
      label: 'Official Sales Inquiries Email',
    },
    {
      name: 'factoryAddress',
      type: 'textarea',
      defaultValue: 'Plot No. 42-45, Agro Green Industrial Zone, Sanand, Gujarat, India - 382110',
      label: 'Factory & Registered Office Address',
    },
    {
      name: 'announcementMarquee',
      type: 'group',
      label: 'Top Announcement Marquee Bar',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Announcement Marquee Bar at Top of Website',
        },
        {
          name: 'announcements',
          type: 'array',
          label: 'Marquee Notice Items',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Announcement Text (e.g. 🌱 100% Sugarcane Bagasse • Zero Trees Cut Down)',
            },
          ],
        },
      ],
    },
  ],
};
