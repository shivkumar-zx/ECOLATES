import React from 'react';
import productsData from '@/data/products.json';
import ProductDetailClient from './ProductDetailClient';

// Dynamic SEO metadata for each individual product
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | Ecolates Tableware',
      description: 'The requested bagasse tableware product was not found.',
    };
  }

  return {
    title: `${product.title} | Direct Factory Supply | Ecolates`,
    description: `Wholesale ${product.title} manufactured from 100% compostable sugarcane bagasse. Minimum Order Quantity: ${product.moq}. Microwave and freezer safe (-20°C to 120°C).`,
    keywords: `${product.title}, bagasse ${product.category}, sugarcane packaging, eco tableware manufacturer`,
    openGraph: {
      title: `${product.title} | Ecolates`,
      description: product.shortDescription,
      images: [{ url: product.featuredImage }],
    },
  };
}

export async function generateStaticParams() {
  return productsData.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);

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

  // Related products from same category
  const related = productsData
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      {/* Schema.org Structured Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.title,
            image: product.images,
            description: product.description,
            sku: product.sku,
            brand: {
              '@type': 'Brand',
              name: 'Ecolates',
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: product.price.replace(/[^0-9.]/g, ''),
              availability: 'https://schema.org/InStock',
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
