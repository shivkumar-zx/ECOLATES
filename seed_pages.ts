import { getPayload } from 'payload';
import config from './payload.config';

async function seedPages() {
  console.log('🌱 Seeding Pages and Site Settings into Payload SQLite database...');
  const payload = await getPayload({ config });

  // 1. Seed Site Settings
  const existingSettings = await payload.find({
    collection: 'site-settings',
    limit: 1,
  });

  if (existingSettings.totalDocs === 0) {
    await payload.create({
      collection: 'site-settings',
      data: {
        companyName: 'Ecolates Eco Solutions Pvt. Ltd.',
        tagline: 'India’s Premier Sugarcane Bagasse Tableware Manufacturer',
        phone: '+91 90999 12345',
        whatsappNumber: '+91 90999 12345',
        email: 'sales@ecolates.com',
        factoryAddress: 'Plot No. 42-45, Agro Green Industrial Zone, Sanand, Gujarat, India - 382110',
        announcementMarquee: {
          enabled: true,
          announcements: [
            { text: '🌱 100% Sugarcane Bagasse • Zero Trees Cut Down' },
            { text: '🎁 Free B2B Evaluation Sample Kits Delivered to Your Kitchen' },
            { text: '🏭 Direct Factory Supply • Minimum Order Quantity: 5,000 Units' },
            { text: '📜 ISO 9001:2015 & BPI Certified • 100% Soil Compostable' },
            { text: '❄️ Microwave (-20°C to 120°C) & Freezer Safe' },
            { text: '🚀 Pan-India Express Dispatch (Delhi, Mumbai, Bengaluru, Chennai)' },
          ],
        },
      },
    });
    console.log('✅ Site Settings created successfully!');
  } else {
    console.log('ℹ️ Site Settings already present.');
  }

  // 2. Seed Pages (Home, About, Certifications, Products)
  const defaultPages = [
    {
      title: 'Home Page',
      slug: 'home',
      seo: {
        metaTitle: 'Ecolates | Sustainable Sugarcane Bagasse Tableware & Food Packaging',
        metaDescription: 'Leading manufacturer of 100% biodegradable and compostable sugarcane bagasse plates, bowls, food containers, and meal trays in India. Direct factory wholesale B2B supply.',
        keywords: 'bagasse plates, sugarcane tableware manufacturer, biodegradable food containers, compostable bowls, wholesale tableware India',
        ogImage: 'https://www.ecolates.com/wp-content/uploads/2023/04/ecolates_logo.jpg',
      },
      heroSection: {
        heroBadge: '100% Sugarcane Agro-Waste • Direct Factory Supply',
        heroHeading: 'Pure Sugarcane Bagasse Tableware & Food Packaging Solutions',
        heroSubheading: 'High-strength, oil-resistant, compostable plates, bowls, meal trays, and containers engineered for cloud kitchens, QSR chains, corporate catering, and global wholesale distributors.',
        primaryCtaText: 'Request Free Sample Kit',
        primaryCtaLink: '#samples',
        secondaryCtaText: 'Explore Product Catalog',
        secondaryCtaLink: '/products',
      },
      statMonthlyCapacity: '20,000,000+ Units/Mo',
      statProductionLines: '18 High-Speed Hydraulic Lines',
      statActiveClients: '500+ HORECA Brands',
      statExportMarkets: '15+ Countries',
      sections: [
        {
          sectionId: 'bestsellers',
          heading: 'High-Volume Commercial Bestsellers',
          subtitle: 'Direct factory pricing on India’s most trusted eco-friendly disposables',
          content: 'Engineered from dry sugarcane pulp, delivering 120°C hot oil resistance, microwave safety, and rapid 90-day soil breakdown.',
        },
        {
          sectionId: 'industry',
          heading: 'Which Industry Can Use Ecolates Tableware?',
          subtitle: 'Custom tailored food packaging solutions for diverse commercial hospitality formats',
          content: 'Trusted by QSR chains, corporate cafeterias, flight catering, luxury banquets, and cloud kitchens.',
        },
        {
          sectionId: 'bundles',
          heading: 'Curated Starter Tableware Bundles',
          subtitle: 'Ready-to-deploy trial packs for restaurants, cafes, and catering enterprises',
          content: 'Everything you need to eliminate single-use plastics from your kitchen operations.',
        },
      ],
    },
    {
      title: 'About Us',
      slug: 'about',
      seo: {
        metaTitle: 'About Us | India’s Premier Sugarcane Bagasse Tableware Manufacturer | Ecolates',
        metaDescription: 'Learn about Ecolates leadership, high-capacity eco tableware manufacturing facilities, and our mission to replace single-use plastics.',
        keywords: 'about ecolates, sugarcane tableware factory, bagasse manufacturers india',
        ogImage: 'https://www.ecolates.com/wp-content/uploads/2023/04/ecolates_logo.jpg',
      },
      heroSection: {
        heroBadge: 'Zero Plastic • Pure Agro Biomass',
        heroHeading: 'Pioneering Circular Agro-Waste Tableware in India',
        heroSubheading: 'Transforming sugarcane residue into food-safe, certified commercial packaging that enriches our soil instead of filling landfills.',
        primaryCtaText: 'Visit Factory or Request Samples',
        primaryCtaLink: '#contact',
        secondaryCtaText: 'View Certifications',
        secondaryCtaLink: '/certifications',
      },
      statMonthlyCapacity: '25,000 Metric Tons Agro-Waste Diverted',
      statProductionLines: '100% PFAS-Free Formulation',
      statActiveClients: 'ISO 22000 Certified Cleanrooms',
      statExportMarkets: 'Zero Effluent Discharge Plant',
    },
    {
      title: 'Lab Certifications & Compliance',
      slug: 'certifications',
      seo: {
        metaTitle: 'Lab Certifications & Compliance Reports | Ecolates',
        metaDescription: 'Download verified lab test reports for Ecolates tableware including ISO 22000:2018, PFAS-free test results, and leak reports.',
        keywords: 'ecolates certifications, pfas free tableware, iso 22000 certificate',
        ogImage: 'https://www.ecolates.com/wp-content/uploads/2023/04/ecolates_logo.jpg',
      },
      heroSection: {
        heroBadge: 'Internationally Verified & Lab Tested',
        heroHeading: 'Rigorous Food Safety, PFAS-Free & Compostability Certifications',
        heroSubheading: 'Every production batch undergoes strict laboratory verification for thermal stability, heavy metal screening, food-contact hygiene, and 90-day compostability.',
        primaryCtaText: 'Download Certificate Bundle (PDF)',
        primaryCtaLink: '#',
        secondaryCtaText: 'Request Custom Audit',
        secondaryCtaLink: '#contact',
      },
    },
  ];

  for (const pageData of defaultPages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: pageData.slug } },
    });

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'pages',
        data: pageData as any,
      });
      console.log(`+ Page created in CMS: ${pageData.title} (${pageData.slug})`);
    } else {
      console.log(`ℹ️ Page already exists: ${pageData.title}`);
    }
  }

  console.log('🎉 Seeding completed successfully!');
  process.exit(0);
}

seedPages().catch((err) => {
  console.error('❌ Error during page seeding:', err);
  process.exit(1);
});
