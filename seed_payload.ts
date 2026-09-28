import { getPayload } from 'payload';
import config from './payload.config';
import fs from 'fs';

async function seed() {
  console.log('🌱 Starting Payload SQLite Database Seed for Ecolates...');
  const payload = await getPayload({ config });

  // 1. Create Default Admin User
  const users = await payload.find({
    collection: 'users',
    where: {
      email: { equals: 'admin@ecolates.com' },
    },
  });

  if (users.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@ecolates.com',
        password: 'ecolates_admin_2026',
        name: 'Ecolates Master Admin',
        role: 'admin',
        company: 'Ecolates Tableware Private Limited',
        phone: '+91 98765 43210',
      },
    });
    console.log('✅ Admin user created: admin@ecolates.com / ecolates_admin_2026');
  } else {
    console.log('ℹ️ Admin user already exists.');
  }

  // 2. Read products from src/data/products.json
  const rawProducts = JSON.parse(fs.readFileSync('./src/data/products.json', 'utf-8'));
  console.log(`📦 Found ${rawProducts.length} processed products to check/import.`);

  // 3. Create Categories
  const categoryMap: Record<string, string> = {
    'bowls': 'Bowls (Soup, Gravy, Desserts)',
    'plates': 'Plates (Round, Square, Compartment)',
    'trays': 'Meal Trays (5-CP & 6-CP Bento Thalis)',
    'containers': 'Containers (Hinged Clamshells)',
    'cutlery': 'Birchwood Cutlery (Forks, Spoons, Knives)',
  };

  for (const [slug, title] of Object.entries(categoryMap)) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
    });
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'categories',
        data: { title, slug },
      });
      console.log(`+ Category created: ${title}`);
    }
  }

  // 4. Create Products
  let count = 0;
  for (const p of rawProducts) {
    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: p.slug } },
    });

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'products',
        data: {
          title: p.title || p.name || 'Sugarcane Bagasse Product',
          slug: p.slug,
          legacyId: p.id,
          categorySlug: p.categorySlug || 'bowls',
          price: p.price || '₹2.10',
          regularPrice: p.regularPrice || '₹2.60',
          featuredImage: p.featuredImage || (p.images && p.images[0]) || 'https://www.ecolates.com/wp-content/uploads/2023/02/3-compartments-9-inch-bagasse-plate.jpg',
          gallery: (p.images || []).map((url: string) => ({ url })),
          bestseller: !!p.bestseller,
          shortDescription: p.shortDescription || p.overview || '',
          specs: {
            diameter: p.specs?.diameter || '',
            height: p.specs?.height || '',
            weight: p.specs?.weight || p.parsedSpecs?.itemWeight || '',
            load: p.specs?.load || '',
            ctnQuantity: p.specs?.ctnQuantity || p.parsedSpecs?.qtyPerCase || '',
            packing: p.specs?.packing || p.parsedSpecs?.packing || '',
            caseNetWeight: p.specs?.caseNetWeight || p.parsedSpecs?.caseNetWeight || '',
            caseGrossWeight: p.specs?.caseGrossWeight || p.parsedSpecs?.caseGrossWeight || '',
            caseDimensionsCm: p.specs?.caseDimensionsCm || p.parsedSpecs?.caseDimensionsCm || '',
            caseDimensionsInch: p.specs?.caseDimensionsInch || p.parsedSpecs?.caseDimensionsInch || '',
            cbmPerCase: p.specs?.cbmPerCase || p.parsedSpecs?.cbmPerCase || '',
            qty40ftContainer: p.specs?.qty40ftContainer || p.parsedSpecs?.qty40ftContainer || '',
            thermal: p.specs?.thermal || '-20°C to 120°C',
          },
          rawDescription: p.rawDescription || p.raw_description || '',
        },
      });
      console.log(`+ Product created: ${p.title}`);
      count++;
    }
  }

  console.log(`🎉 Seeding complete! ${count} products inserted into SQLite database.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});
