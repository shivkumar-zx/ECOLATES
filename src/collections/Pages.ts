import type { CollectionConfig } from 'payload';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Website & SEO',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title (Internal Reference)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Page URL Identifier (e.g. home, about, certifications)',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Search Engine Optimization (SEO)',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Google Meta Title Tag (Ideal: 50-60 characters)',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Google Meta Description (Ideal: 150-160 characters)',
            },
            {
              name: 'keywords',
              type: 'text',
              label: 'Target Keywords (comma-separated)',
            },
            {
              name: 'ogImage',
              type: 'text',
              label: 'Social Share Preview Image URL (Open Graph)',
            },
            {
              name: 'canonicalUrl',
              type: 'text',
              label: 'Canonical URL (leave blank for auto)',
            },
          ],
        },
        {
          label: 'Hero Section Content',
          fields: [
            {
              name: 'heroBadge',
              type: 'text',
              label: 'Top Pill Badge (e.g. 100% Sugarcane Bagasse • Direct Factory Supply)',
            },
            {
              name: 'heroHeading',
              type: 'text',
              label: 'Main Headline (H1)',
            },
            {
              name: 'heroSubheading',
              type: 'textarea',
              label: 'Subheading Text',
            },
            {
              name: 'primaryCtaText',
              type: 'text',
              label: 'Primary Button Label (e.g. Request Free Sample Box)',
            },
            {
              name: 'primaryCtaLink',
              type: 'text',
              label: 'Primary Button Link',
            },
            {
              name: 'secondaryCtaText',
              type: 'text',
              label: 'Secondary Button Label (e.g. Download B2B Price Matrix)',
            },
            {
              name: 'secondaryCtaLink',
              type: 'text',
              label: 'Secondary Button Link',
            },
          ],
        },
        {
          label: 'Factory Highlights & Stats',
          fields: [
            {
              name: 'statMonthlyCapacity',
              type: 'text',
              label: 'Monthly Capacity (e.g. 20M+ Pieces/mo)',
            },
            {
              name: 'statProductionLines',
              type: 'text',
              label: 'Thermoforming Machinery (e.g. 18 High-Speed Hydraulic Lines)',
            },
            {
              name: 'statActiveClients',
              type: 'text',
              label: 'Commercial Clients (e.g. 500+ HORECA Brands)',
            },
            {
              name: 'statExportMarkets',
              type: 'text',
              label: 'Global Export Reach (e.g. 15+ Countries)',
            },
          ],
        },
        {
          label: 'Custom Content Sections',
          fields: [
            {
              name: 'sections',
              type: 'array',
              label: 'Editable Page Sections',
              fields: [
                {
                  name: 'sectionId',
                  type: 'text',
                  label: 'Section ID (e.g. bestsellers, industry, certifications)',
                },
                {
                  name: 'heading',
                  type: 'text',
                  label: 'Section Heading',
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Section Subtitle / Tagline',
                },
                {
                  name: 'content',
                  type: 'textarea',
                  label: 'Section Description / Copy',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
