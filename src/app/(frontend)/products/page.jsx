import React, { Suspense } from 'react';
import ProductsCatalogClient from '@/components/ProductsCatalogClient';
import { getPageSeo, getAllProducts } from '@/lib/payloadData';

// Dynamic SEO metadata fetched from Payload CMS database
export async function generateMetadata() {
  const seo = await getPageSeo('products');
  return {
    title: seo.title || 'Complete Tableware Catalog | Wholesale Sugarcane Bagasse | Ecolates',
    description:
      seo.description ||
      'Browse our complete range of certified biodegradable and compostable sugarcane bagasse plates, bowls, meal trays, and containers. Direct factory wholesale B2B pricing.',
    keywords:
      seo.keywords ||
      'bagasse plates catalog, compostable food containers wholesale, sugarcane tableware factory, meal trays bulk India',
    openGraph: {
      title: seo.title || 'Complete Tableware Catalog | Ecolates',
      description: seo.description,
      images: [{ url: seo.ogImage || 'https://www.ecolates.com/wp-content/uploads/2023/04/ecolates_logo.jpg' }],
    },
  };
}

export default async function ProductsPage() {
  const products = await getAllProducts();

  // Generate Schema.org ItemList for Google and AI Crawlers (ChatGPT, Perplexity, Claude)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ecolates Sugarcane Bagasse Commercial Tableware Catalog',
    description:
      'Factory direct catalogue of 100% compostable and biodegradable tableware items manufactured from pure sugarcane bagasse agro-waste.',
    numberOfItems: products.length,
    itemListElement: products.map((p, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: p.title,
        description: p.shortDescription || p.title,
        image: p.featuredImage,
        url: `https://ecolates.vercel.app/products/${p.slug}`,
        category: p.category,
        material: '100% Sugarcane Bagasse Agro-Waste Pulp',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: (p.price || '0').replace(/[^0-9.]/g, ''),
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
        },
      },
    })),
  };

  return (
    <div style={{ padding: '40px 0 80px' }}>
      {/* Schema.org Structured Data for AI & Search Engine Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container">
        {/* Breadcrumb & Title — 100% Server Rendered HTML for AI crawlers */}
        <header style={{ marginBottom: '28px' }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: '0.84rem', color: '#7a9485', marginBottom: '8px' }}>
            <a href="/" style={{ color: '#2d6a4f', fontWeight: 600 }}>
              Home
            </a>{' '}
            / <span style={{ color: '#182a20' }}>Commercial Catalog</span>
          </nav>

          <span className="light-green-tag">Direct Factory Supply</span>
          <h1 style={{ fontSize: '2.5rem', color: '#1b4332', margin: '8px 0 6px', fontWeight: 800 }}>
            Complete Tableware Catalog
          </h1>
          <p style={{ color: '#486153', fontSize: '1.05rem', maxWidth: '780px', lineHeight: 1.6 }}>
            Explore our certified commercial sugarcane bagasse tableware lines. Direct manufacturer pricing with custom
            debossing tooling, oil and water leak resistance (-20°C to 120°C), and express pan-India dispatch.
          </p>
        </header>

        {/* Interactive Client Catalog with Server-Side Fallback */}
        <Suspense
          fallback={
            <div className="product-grid" style={{ marginTop: '24px' }}>
              {products.map((p) => (
                <article key={p.slug || p.id} className="product-card">
                  <a href={`/products/${p.slug}`} className="card-img-wrap">
                    <img src={p.featuredImage} alt={p.title} loading="lazy" />
                  </a>
                  <div className="product-card-body">
                    <span className="product-cat-tag">{p.category}</span>
                    <a href={`/products/${p.slug}`}>
                      <h3 className="product-card-title">{p.title}</h3>
                    </a>
                    <p className="product-card-desc">{p.shortDescription}</p>
                    <div className="product-card-footer">
                      <div className="card-price-col">
                        <span className="card-price-sub">Factory Rate</span>
                        <span className="card-price-val">{p.price}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          }
        >
          <ProductsCatalogClient initialProducts={products} />
        </Suspense>
      </div>
    </div>
  );
}
