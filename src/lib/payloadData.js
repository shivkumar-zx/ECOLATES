import { getPayload } from 'payload';
import configPromise from '@payload-config';
import siteConfig from '@/data/site-config.json';
import localProducts from '@/data/products.json';

/**
 * Safely retrieves the Payload CMS client instance
 */
export async function getPayloadClient() {
  try {
    return await getPayload({ config: configPromise });
  } catch (error) {
    console.warn('Payload client initialization fallback:', error?.message);
    return null;
  }
}

/**
 * Retrieves SEO & page data for a specific page slug from Payload CMS DB,
 * with automatic fallback to static site-config.json if not found or DB offline.
 */
export async function getPageSeo(slug) {
  try {
    const payload = await getPayloadClient();
    if (payload) {
      const result = await payload.find({
        collection: 'pages',
        where: {
          slug: { equals: slug },
        },
        limit: 1,
      });

      if (result?.docs?.length > 0) {
        const doc = result.docs[0];
        const seoData = doc.seo || {};

        return {
          title: doc.metaTitle || seoData.metaTitle || siteConfig.seo?.[slug]?.title || `${doc.title} | Ecolates`,
          description: doc.metaDescription || seoData.metaDescription || siteConfig.seo?.[slug]?.description || '',
          keywords: doc.keywords || seoData.keywords || siteConfig.seo?.[slug]?.keywords || '',
          ogImage: doc.ogImage || seoData.ogImage || siteConfig.seo?.[slug]?.ogImage || 'https://www.ecolates.com/wp-content/uploads/2023/04/ecolates_logo.jpg',
          canonicalUrl: doc.canonicalUrl || seoData.canonicalUrl || '',
          pageDoc: doc,
        };
      }
    }
  } catch (error) {
    console.warn(`Error fetching SEO for page "${slug}":`, error?.message);
  }

  // Graceful fallback to static site-config.json
  const fallback = siteConfig.seo?.[slug] || siteConfig.seo?.home || {};
  return {
    title: fallback.title || 'Ecolates | Sustainable Sugarcane Bagasse Tableware',
    description: fallback.description || '',
    keywords: fallback.keywords || '',
    ogImage: fallback.ogImage || 'https://www.ecolates.com/wp-content/uploads/2023/04/ecolates_logo.jpg',
    canonicalUrl: '',
    pageDoc: null,
  };
}

/**
 * Retrieves all products from Payload CMS DB, falling back to local products.json
 */
export async function getAllProducts() {
  try {
    const payload = await getPayloadClient();
    if (payload) {
      const result = await payload.find({
        collection: 'products',
        limit: 100,
        sort: 'legacyId',
      });

      if (result?.docs?.length > 0) {
        return result.docs.map((doc) => ({
          id: doc.legacyId || doc.id,
          title: doc.title,
          slug: doc.slug,
          category: doc.categorySlug,
          categorySlug: doc.categorySlug,
          price: doc.price,
          regularPrice: doc.regularPrice,
          featuredImage: doc.featuredImage,
          gallery: doc.gallery?.map((g) => g.url) || [],
          bestseller: doc.bestseller,
          shortDescription: doc.shortDescription,
          rawDescription: doc.rawDescription,
          specs: doc.specs || {},
          parsedSpecs: doc.specs || {},
          moq: doc.specs?.ctnQuantity ? `${doc.specs.ctnQuantity} pcs` : '1000 pcs',
          thermal: doc.specs?.thermal || '-20°C to 120°C',
        }));
      }
    }
  } catch (error) {
    console.warn('Error fetching products from DB, using local catalog:', error?.message);
  }

  return localProducts;
}

/**
 * Retrieves a single product by slug from Payload CMS DB
 */
export async function getProductBySlug(slug) {
  try {
    const payload = await getPayloadClient();
    if (payload) {
      const result = await payload.find({
        collection: 'products',
        where: {
          slug: { equals: slug },
        },
        limit: 1,
      });

      if (result?.docs?.length > 0) {
        const doc = result.docs[0];
        return {
          id: doc.legacyId || doc.id,
          title: doc.title,
          slug: doc.slug,
          category: doc.categorySlug,
          categorySlug: doc.categorySlug,
          price: doc.price,
          regularPrice: doc.regularPrice,
          featuredImage: doc.featuredImage,
          gallery: doc.gallery?.map((g) => g.url) || [],
          bestseller: doc.bestseller,
          shortDescription: doc.shortDescription,
          rawDescription: doc.rawDescription,
          specs: doc.specs || {},
          parsedSpecs: doc.specs || {},
          moq: doc.specs?.ctnQuantity ? `${doc.specs.ctnQuantity} pcs` : '1000 pcs',
          thermal: doc.specs?.thermal || '-20°C to 120°C',
        };
      }
    }
  } catch (error) {
    console.warn(`Error fetching product ${slug}:`, error?.message);
  }

  return localProducts.find((p) => p.slug === slug) || null;
}
