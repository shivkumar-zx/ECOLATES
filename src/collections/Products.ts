import type { CollectionConfig } from 'payload';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    group: 'Catalog Management',
    defaultColumns: ['title', 'categorySlug', 'price', 'bestseller', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Product Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Handle / Slug',
    },
    {
      name: 'legacyId',
      type: 'number',
      label: 'Catalog SKU / ID',
    },
    {
      name: 'categorySlug',
      type: 'select',
      label: 'Tableware Category',
      options: [
        { label: 'Bowls (Soup, Gravy, Desserts)', value: 'bowls' },
        { label: 'Plates (Round, Square, Compartment)', value: 'plates' },
        { label: 'Meal Trays (5-CP & 6-CP Bento Thalis)', value: 'trays' },
        { label: 'Containers (Hinged Clamshells)', value: 'containers' },
        { label: 'Birchwood Cutlery (Forks, Spoons, Knives)', value: 'cutlery' },
      ],
      required: true,
    },
    {
      name: 'price',
      type: 'text',
      required: true,
      label: 'Unit Wholesale Price (e.g. ₹1.85)',
    },
    {
      name: 'regularPrice',
      type: 'text',
      label: 'MSRP / Regular Price (e.g. ₹2.40)',
    },
    {
      name: 'featuredImage',
      type: 'text',
      required: true,
      label: 'Main Product Photo URL',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Multi-Angle Gallery Photos',
      fields: [
        {
          name: 'url',
          type: 'text',
          label: 'Image URL',
        },
      ],
    },
    {
      name: 'bestseller',
      type: 'checkbox',
      defaultValue: false,
      label: 'Feature on Homepage Bestsellers',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Quick Commercial Overview',
    },
    {
      name: 'specs',
      type: 'group',
      label: 'Factory Technical & Packaging Specifications',
      fields: [
        { name: 'diameter', type: 'text', label: 'Diameter / Dimensions' },
        { name: 'height', type: 'text', label: 'Depth / Height' },
        { name: 'weight', type: 'text', label: 'Unit Weight (Grams)' },
        { name: 'load', type: 'text', label: 'Volume Capacity (ml / oz)' },
        { name: 'ctnQuantity', type: 'text', label: 'Qty Per Carton Case' },
        { name: 'packing', type: 'text', label: 'Inner Pack Configuration (e.g. 50×20)' },
        { name: 'caseNetWeight', type: 'text', label: 'Case Net Weight' },
        { name: 'caseGrossWeight', type: 'text', label: 'Case Gross Weight' },
        { name: 'caseDimensionsCm', type: 'text', label: 'Case Dimensions (cm)' },
        { name: 'caseDimensionsInch', type: 'text', label: 'Case Dimensions (Inches)' },
        { name: 'cbmPerCase', type: 'text', label: 'CBM Volume Per Case' },
        { name: 'qty40ftContainer', type: 'text', label: 'Total Cases in 40ft Container' },
        { name: 'thermal', type: 'text', defaultValue: '-20°C to 120°C', label: 'Thermal Resistance Range' },
      ],
    },
    {
      name: 'rawDescription',
      type: 'textarea',
      label: 'Full Commercial Description (HTML / Features)',
    },
  ],
};
