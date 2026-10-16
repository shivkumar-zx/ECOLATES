'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'next/navigation';
import { SampleContext } from '@/components/ClientLayoutShell';

export default function ProductsCatalogClient({ initialProducts = [] }) {
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

  const filtered = initialProducts.filter((p) => {
    const matchesCat = category === 'all' || p.categorySlug === category;
    if (!query || !query.trim()) return matchesCat;

    const qLower = query.toLowerCase().trim();
    const titleMatch = (p.title || '').toLowerCase().includes(qLower);
    const catMatch = (p.category || '').toLowerCase().includes(qLower);
    const skuMatch = (p.id || '').toString().toLowerCase().includes(qLower);
    const descMatch = ((p.shortDescription || '') + ' ' + (p.rawDescription || '')).toLowerCase().includes(qLower);
    const specsMatch = p.specs ? JSON.stringify(p.specs).toLowerCase().includes(qLower) : false;

    return matchesCat && (titleMatch || catMatch || skuMatch || descMatch || specsMatch);
  });

  return (
    <div>
      {/* Interactive Filter & Search Bar */}
      <div
        style={{
          background: '#ffffff',
          border: '1.5px solid #ddecde',
          borderRadius: '18px',
          padding: '18px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Items' },
            { id: 'plates', label: 'Plates & Platters' },
            { id: 'trays', label: 'Bento & Thali Trays' },
            { id: 'containers', label: 'Delivery Containers' },
            { id: 'bowls', label: 'Bowls & Soups' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              style={{
                border: 'none',
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: category === cat.id ? '#2d6a4f' : '#f0fbf4',
                color: category === cat.id ? '#ffffff' : '#2d6a4f',
                transition: 'all 0.2s ease',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '240px' }}>
          <input
            type="text"
            placeholder="Search in catalog..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 14px',
              border: '1.5px solid #ddecde',
              borderRadius: '999px',
              fontSize: '0.84rem',
              outline: 'none',
            }}
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
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#fff',
            borderRadius: '18px',
            border: '1.5px dashed #b7e4c7',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔍</div>
          <h3 style={{ fontSize: '1.3rem', color: '#1b4332', marginBottom: '6px' }}>
            No products match "{query}"
          </h3>
          <p style={{ color: '#486153', marginBottom: '16px' }}>
            Try searching for "plate", "tray", "bowl", or reset filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory('all');
              setQuery('');
            }}
            className="btn btn-primary-green"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => (
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

                <div className="product-meta-pills">
                  <span className="meta-pill">MOQ: {p.moq || '1000 pcs'}</span>
                  <span className="meta-pill">{p.thermal || '-20°C to 120°C'}</span>
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
                      Specs
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
