import React from 'react';
import ProductDetailClient from './ProductDetailClient';
import { getProductBySlug, getAllProducts } from '@/lib/payloadData';

// Dynamic SEO metadata for each individual product from Payload DB
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Ecolates Tableware',
      description: 'The requested bagasse tableware product was not found.',
    };
  }

  const cleanPrice = product.price || '';

  return {
    title: `${product.title} | Factory Wholesale Supply | Ecolates`,
    description:
      product.shortDescription ||
      `Wholesale ${product.title} manufactured from 100% compostable sugarcane bagasse. Minimum Order Quantity: ${product.moq || '1000 pcs'}. Microwave and freezer safe (-20°C to 120°C).`,
    keywords: `${product.title}, bagasse ${product.category || 'tableware'}, sugarcane packaging, compostable tableware wholesale`,
    openGraph: {
      title: `${product.title} | Ecolates`,
      description: product.shortDescription || `${product.title} direct factory wholesale rate ${cleanPrice}`,
      images: [{ url: product.featuredImage }],
    },
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p>The requested product could not be located in our catalog.</p>
        <a href="/products" className="btn btn-primary-green" style={{ marginTop: '16px' }}>
          Back to All Products
        </a>
      </div>
    );
  }

  const allProducts = await getAllProducts();
  // Related products from same category
  const related = allProducts
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, 4);

  const numericPrice = (product.price || '0').replace(/[^0-9.]/g, '');

  return (
    <>
      {/* Schema.org Structured Data for Google Rich Snippets & AI LLMs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.title,
            image: product.featuredImage ? [product.featuredImage, ...(product.gallery || [])] : [],
            description: product.shortDescription || product.rawDescription || product.title,
            sku: String(product.id || product.slug),
            material: '100% Sugarcane Bagasse Agro-Waste Pulp',
            brand: {
              '@type': 'Brand',
              name: 'Ecolates',
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: numericPrice || '0.00',
              availability: 'https://schema.org/InStock',
              itemCondition: 'https://schema.org/NewCondition',
              seller: {
                '@type': 'Organization',
                name: 'Ecolates Eco Solutions Pvt. Ltd.',
              },
            },
          }),
        }}
      />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}
