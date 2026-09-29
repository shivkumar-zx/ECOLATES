'use client';

import React, { useState, useEffect, useContext, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import productsData from '@/data/products.json';
import { SampleContext } from '@/components/ClientLayoutShell';

function ProductsCatalogContent() {
  const { addSample } = useContext(SampleContext);
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const c = searchParams.get('category');
    if (c) setCategory(c);
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

  const filtered = productsData.filter(p => {
    const matchesCat = category === 'all' || p.categorySlug === category;
    if (!query || !query.trim()) return matchesCat;

    const qLower = query.toLowerCase().trim();
    const titleMatch = (p.title || '').toLowerCase().includes(qLower);
    const catMatch = (p.category || '').toLowerCase().includes(qLower);
    const skuMatch = (p.sku || '').toLowerCase().includes(qLower);
    const descMatch = ((p.overview || '') + ' ' + (p.shortDescription || '') + ' ' + (p.description || '')).toLowerCase().includes(qLower);
    const specsMatch = p.parsedSpecs ? JSON.stringify(p.parsedSpecs).toLowerCase().includes(qLower) : false;

    return matchesCat && (titleMatch || catMatch || skuMatch || descMatch || specsMatch);
  });

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        
        {/* Breadcrumb & Title */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '0.84rem', color: '#7a9485', marginBottom: '8px' }}>
            <a href="/" style={{ color: '#2d6a4f', fontWeight: 600 }}>Home</a> / <span style={{ color: '#182a20' }}>Commercial Catalog</span>
          </div>
          <span className="light-green-tag">Direct Factory Supply</span>
          <h1 style={{ fontSize: '2.5rem', color: '#1b4332', margin: '8px 0 6px' }}>Complete Tableware Catalog</h1>
          <p style={{ color: '#486153', fontSize: '1.05rem', maxWidth: '720px' }}>
            Explore our certified sugarcane bagasse tableware lines. Direct manufacturer pricing with custom debossing tooling and pan-India dispatch.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '18px', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              type="button" 
              onClick={() => setCategory('all')}
              style={{ border: 'none', padding: '8px 16px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', background: category === 'all' ? '#2d6a4f' : '#f0fbf4', color: category === 'all' ? '#ffffff' : '#2d6a4f' }}
            >
              All Items
            </button>
            <button 
              type="button" 
              onClick={() => setCategory('plates')}
              style={{ border: 'none', padding: '8px 16px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', background: category === 'plates' ? '#2d6a4f' : '#f0fbf4', color: category === 'plates' ? '#ffffff' : '#2d6a4f' }}
            >
              Plates & Platters
            </button>
            <button 
              type="button" 
              onClick={() => setCategory('trays')}
              style={{ border: 'none', padding: '8px 16px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', background: category === 'trays' ? '#2d6a4f' : '#f0fbf4', color: category === 'trays' ? '#ffffff' : '#2d6a4f' }}
            >
              Bento & Thali Trays
            </button>
            <button 
              type="button" 
              onClick={() => setCategory('containers')}
              style={{ border: 'none', padding: '8px 16px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', background: category === 'containers' ? '#2d6a4f' : '#f0fbf4', color: category === 'containers' ? '#ffffff' : '#2d6a4f' }}
            >
              Delivery Containers
            </button>
            <button 
              type="button" 
              onClick={() => setCategory('bowls')}
              style={{ border: 'none', padding: '8px 16px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', background: category === 'bowls' ? '#2d6a4f' : '#f0fbf4', color: category === 'bowls' ? '#ffffff' : '#2d6a4f' }}
            >
              Bowls & Soups
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '240px' }}>
            <input 
              type="text" 
              placeholder="Search in catalog..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ width: '100%', padding: '8px 14px', border: '1.5px solid #ddecde', borderRadius: '999px', fontSize: '0.84rem', outline: 'none' }}
            />
            {query && (
              <button 
                type="button" 
                onClick={() => setQuery('')}
                style={{ background: 'none', border: 'none', color: '#7a9485', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Results Count */}
        <div style={{ marginBottom: '20px', fontSize: '0.85rem', color: '#486153' }}>
          Showing <strong>{filtered.length}</strong> products matching your selection:
        </div>

        {/* Product Cards Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '18px', border: '1.5px dashed #b7e4c7' }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔍</div>
            <h3 style={{ fontSize: '1.3rem', color: '#1b4332', marginBottom: '6px' }}>No products match "{query}"</h3>
            <p style={{ color: '#486153', marginBottom: '16px' }}>Try searching for "plate", "tray", "bowl", or reset filters.</p>
            <button 
              type="button" 
              onClick={() => { setCategory('all'); setQuery(''); }} 
              className="btn btn-primary-green"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((p) => (
              <div key={p.id} className="product-card">
                
                <a href={`/products/${p.slug}`} className="card-img-wrap">
                  <img src={p.featuredImage} alt={p.title} loading="lazy" />
                </a>

                <div className="product-card-body">
                  <span className="product-cat-tag">{p.category}</span>
                  <a href={`/products/${p.slug}`}>
                    <h3 className="product-card-title">{p.title}</h3>
                  </a>
                  <p className="product-card-desc">{p.shortDescription}</p>

                  <div className="product-meta-pills">
                    <span className="meta-pill">MOQ: {p.moq}</span>
                    <span className="meta-pill">{p.weight}</span>
                  </div>

                  <div className="product-card-footer">
                    <div className="card-price-col">
                      <span className="card-price-sub">Factory Rate</span>
                      <span className="card-price-val">{p.price}</span>
                    </div>

                    <div className="card-actions-row">
                      <button 
                        type="button" 
                        onClick={() => addSample(p)}
                        className="btn btn-light-green-outline"
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                        title="Add free evaluation piece to sample box"
                      >
                        + Sample
                      </button>
                      <a 
                        href={`/products/${p.slug}`}
                        className="btn btn-primary-green"
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        Details
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ padding: '80px', textAlign: 'center' }}>Loading products catalog...</div>}>
      <ProductsCatalogContent />
    </Suspense>
  );
}
