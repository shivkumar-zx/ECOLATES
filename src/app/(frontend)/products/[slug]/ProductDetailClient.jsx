'use client';

import React, { useState, useContext } from 'react';
import { SampleContext, CartContext } from '@/components/ClientLayoutShell';

export default function ProductDetailClient({ product, related }) {
  const { addSample } = useContext(SampleContext);
  const { addToCart } = useContext(CartContext);
  const [selectedImg, setSelectedImg] = useState(product.featuredImage);
  const [activeTab, setActiveTab] = useState('visuals');
  const [selectedVolume, setSelectedVolume] = useState(5000);
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [rfqForm, setRfqForm] = useState({
    name: '',
    phone: '',
    company: '',
    city: '',
    customDeboss: false,
    notes: ''
  });

  // Calculate tiered unit price based on volume
  const baseNum = parseFloat(product.price?.replace(/[^0-9.]/g, '')) || 2.85;
  let unitRate = baseNum;
  let discountLabel = 'Standard MOQ Tier';

  if (selectedVolume >= 100000) {
    unitRate = (baseNum * 0.82).toFixed(2);
    discountLabel = 'Enterprise Wholesale Tier (Save 18%)';
  } else if (selectedVolume >= 25000) {
    unitRate = (baseNum * 0.90).toFixed(2);
    discountLabel = 'High Volume Restaurant Tier (Save 10%)';
  } else if (selectedVolume >= 10000) {
    unitRate = (baseNum * 0.95).toFixed(2);
    discountLabel = 'Bulk Trial Tier (Save 5%)';
  }

  const estTotal = (unitRate * selectedVolume).toLocaleString('en-IN', { maximumFractionDigits: 0 });
  const pcsPerCarton = parseInt(product.parsedSpecs?.qtyPerCase) || (product.categorySlug === 'trays' ? 250 : product.categorySlug === 'containers' ? 500 : 1000);
  const totalCartons = Math.ceil(selectedVolume / pcsPerCarton);

  const handleRfq = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Product Wholesale RFQ',
          productTitle: product.title,
          sku: product.sku,
          volume: selectedVolume,
          estimatedTotal: `₹${estTotal}`,
          ...rfqForm
        })
      });
      setRfqSubmitted(true);
    } catch (err) {
      setRfqSubmitted(true);
    }
  };

  return (
    <div style={{ padding: '28px 0 80px' }}>
      <div className="container">
        
        {/* Breadcrumbs & Trust Badge Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '0.86rem', color: '#7a9485' }}>
            <a href="/" style={{ color: '#2d6a4f', fontWeight: 600 }}>Home</a>
            <span style={{ margin: '0 8px', color: '#b7e4c7' }}>/</span>
            <a href="/products" style={{ color: '#2d6a4f', fontWeight: 600 }}>Products</a>
            <span style={{ margin: '0 8px', color: '#b7e4c7' }}>/</span>
            <a href={`/products?category=${product.categorySlug}`} style={{ color: '#2d6a4f', fontWeight: 600 }}>{product.category}</a>
            <span style={{ margin: '0 8px', color: '#b7e4c7' }}>/</span>
            <span style={{ color: '#182a20', fontWeight: 600 }}>{product.title}</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.74rem', fontWeight: 800, padding: '5px 12px', borderRadius: '999px', border: '1px solid #86efac', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16a34a' }}></span>
              Ready Factory Stock
            </span>
            <span style={{ background: '#f0fdf4', color: '#166534', fontSize: '0.74rem', fontWeight: 800, padding: '5px 12px', borderRadius: '999px', border: '1px solid #bbf7d0' }}>
              ISO 22000 & PFAS Free
            </span>
            <span style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.74rem', fontWeight: 800, padding: '5px 12px', borderRadius: '999px', border: '1px solid #bae6fd' }}>
              US FDA 21 CFR 176.170
            </span>
          </div>
        </div>

        {/* 2-Column Product Showcase Section */}
        <div className="product-detail-hero-responsive" style={{ background: '#ffffff', border: '1.5px solid #ddecde', borderRadius: '24px', padding: '36px', boxShadow: '0 10px 36px rgba(45, 106, 79, 0.06)', marginBottom: '40px' }}>
          
          {/* Left Column: Image Gallery & Quality Badges */}
          <div>
            <div style={{ background: '#f7fbf8', border: '1.5px solid #b7e4c7', borderRadius: '20px', padding: '28px', minHeight: '430px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <img 
                src={selectedImg} 
                alt={product.title} 
                style={{ maxHeight: '380px', maxWidth: '100%', objectFit: 'contain', transition: 'transform 0.3s ease' }}
              />
              <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', border: '1px solid #b7e4c7', borderRadius: '999px', padding: '4px 12px', fontSize: '0.72rem', fontWeight: 700, color: '#1b4332', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span>🌱</span> 100% Sugarcane Bagasse
              </div>
              <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#52b788', borderRadius: '999px', padding: '4px 12px', fontSize: '0.72rem', fontWeight: 800, color: '#ffffff' }}>
                Factory Direct
              </div>
            </div>

            {/* Thumbnails Carousel */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '16px 2px 6px' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImg(img)}
                    style={{
                      width: '74px',
                      height: '74px',
                      border: selectedImg === img ? '2.5px solid #2d6a4f' : '1px solid #ddecde',
                      borderRadius: '12px',
                      background: '#f7fbf8',
                      padding: '5px',
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'all 0.2s',
                      boxShadow: selectedImg === img ? '0 4px 12px rgba(45, 106, 79, 0.18)' : 'none'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </button>
                ))}
              </div>
            )}

            {/* 4 Icon Feature Badges with clean vector styling */}
            <div className="grid-2-responsive" style={{ gap: '12px', marginTop: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f0fbf4', padding: '12px 14px', borderRadius: '14px', border: '1px solid #b7e4c7' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', border: '1px solid #ddecde', flexShrink: 0 }}>
                  🍃
                </div>
                <div style={{ fontSize: '0.79rem', lineHeight: '1.3' }}>
                  <strong style={{ color: '#1b4332', display: 'block' }}>100% Home Compostable</strong>
                  <span style={{ color: '#486153' }}>Naturally degrades in 60-90 days</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f0fbf4', padding: '12px 14px', borderRadius: '14px', border: '1px solid #b7e4c7' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', border: '1px solid #ddecde', flexShrink: 0 }}>
                  ♨️
                </div>
                <div style={{ fontSize: '0.79rem', lineHeight: '1.3' }}>
                  <strong style={{ color: '#1b4332', display: 'block' }}>Microwave Safe (120°C)</strong>
                  <span style={{ color: '#486153' }}>Reheat piping hot foods & gravies</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f0fbf4', padding: '12px 14px', borderRadius: '14px', border: '1px solid #b7e4c7' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', border: '1px solid #ddecde', flexShrink: 0 }}>
                  ❄️
                </div>
                <div style={{ fontSize: '0.79rem', lineHeight: '1.3' }}>
                  <strong style={{ color: '#1b4332', display: 'block' }}>Freezer Safe (-20°C)</strong>
                  <span style={{ color: '#486153' }}>Withstands cold storage & chillers</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f0fbf4', padding: '12px 14px', borderRadius: '14px', border: '1px solid #b7e4c7' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', border: '1px solid #ddecde', flexShrink: 0 }}>
                  ⚡
                </div>
                <div style={{ fontSize: '0.79rem', lineHeight: '1.3' }}>
                  <strong style={{ color: '#1b4332', display: 'block' }}>Zero PFAS / No Bleach</strong>
                  <span style={{ color: '#486153' }}>100% Food-contact safe lab tested</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Title, Quick Specs, Pricing Calculator & Inquiry */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="light-green-tag">{product.category}</span>
              <span style={{ fontSize: '0.8rem', color: '#7a9485', fontWeight: 600 }}>SKU: {product.sku}</span>
              {product.bestseller && (
                <span style={{ background: '#fef3c7', color: '#92400e', fontSize: '0.74rem', fontWeight: 800, padding: '3px 8px', borderRadius: '6px' }}>
                  ★ Best Selling Item
                </span>
              )}
            </div>

            <h1 style={{ fontSize: '2.2rem', color: '#1b4332', margin: '4px 0 12px', lineHeight: '1.22' }}>
              {product.title}
            </h1>

            {/* Clean Short Description without specs dump */}
            <p style={{ color: '#486153', fontSize: '0.98rem', lineHeight: '1.65', marginBottom: '20px' }}>
              {product.overview || product.shortDescription}
            </p>

            {/* Quick Spec Highlights Strip */}
            <div className="product-specs-highlights">
              <div style={{ background: '#f7faf8', border: '1px solid #ddecde', borderRadius: '12px', padding: '10px 12px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: '#7a9485', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Case Pack</span>
                <strong style={{ fontSize: '0.95rem', color: '#1b4332' }}>{product.parsedSpecs?.qtyPerCase || pcsPerCarton} pcs</strong>
              </div>
              <div style={{ background: '#f7faf8', border: '1px solid #ddecde', borderRadius: '12px', padding: '10px 12px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: '#7a9485', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Item Weight</span>
                <strong style={{ fontSize: '0.95rem', color: '#1b4332' }}>{product.parsedSpecs?.itemWeight || 'Standard'}</strong>
              </div>
              <div style={{ background: '#f7faf8', border: '1px solid #ddecde', borderRadius: '12px', padding: '10px 12px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: '#7a9485', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Case Net Wt</span>
                <strong style={{ fontSize: '0.95rem', color: '#1b4332' }}>{product.parsedSpecs?.caseNetWeight || '5.0 kg'}</strong>
              </div>
              <div style={{ background: '#f7faf8', border: '1px solid #ddecde', borderRadius: '12px', padding: '10px 12px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: '#7a9485', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Temp Range</span>
                <strong style={{ fontSize: '0.95rem', color: '#1b4332' }}>-20° to 120°C</strong>
              </div>
            </div>

            {/* Interactive Tier Pricing & Volume Card */}
            <div style={{ background: '#f0fbf4', border: '2px solid #b7e4c7', borderRadius: '20px', padding: '24px', marginBottom: '24px', boxShadow: '0 4px 16px rgba(45, 106, 79, 0.06)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.76rem', color: '#486153', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Factory Direct Wholesale Rate</span>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1b4332', lineHeight: '1.1' }}>
                    ₹{unitRate} <small style={{ fontSize: '0.88rem', fontWeight: 600, color: '#486153' }}>/ piece</small>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: 700, display: 'inline-block', marginTop: '2px' }}>
                    ✓ {discountLabel}
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.76rem', color: '#7a9485' }}>Order Total ({totalCartons} Master Cartons)</span>
                  <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#2d6a4f' }}>
                    ₹{estTotal}
                  </div>
                  <small style={{ fontSize: '0.74rem', color: '#7a9485' }}>GST (18%) & Freight calculated at dispatch</small>
                </div>
              </div>

              {/* Volume Preset Selector Buttons */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1b4332', marginBottom: '8px' }}>
                  Choose Required Commercial Volume:
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[5000, 10000, 25000, 50000, 100000].map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setSelectedVolume(vol)}
                      style={{
                        padding: '9px 16px',
                        borderRadius: '999px',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        border: selectedVolume === vol ? '2px solid #2d6a4f' : '1px solid #b7e4c7',
                        background: selectedVolume === vol ? '#2d6a4f' : '#ffffff',
                        color: selectedVolume === vol ? '#ffffff' : '#2d6a4f',
                        boxShadow: selectedVolume === vol ? '0 4px 12px rgba(45, 106, 79, 0.2)' : 'none',
                        transition: 'all 0.2s'
                      }}
                    >
                      {vol.toLocaleString()} pcs
                    </button>
                  ))}
                </div>
              </div>

              {/* Compact 3-Action Button Bar: Add to Cart, Instant RFQ, Free Sample */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => addToCart({
                    id: product.id,
                    title: product.title,
                    slug: product.slug,
                    sku: product.sku,
                    featuredImage: selectedImg || product.featuredImage,
                    unitRate,
                    volume: selectedVolume,
                    cartons: totalCartons,
                    total: estTotal
                  })}
                  className="btn btn-primary-green"
                  style={{ width: '100%', justifyContent: 'center', padding: '10px 12px', fontSize: '0.84rem', fontWeight: 800 }}
                  title="Add selected volume to wholesale cart"
                >
                  🛒 Add to Cart
                </button>

                <button
                  type="button"
                  onClick={() => setIsRfqModalOpen(true)}
                  className="btn btn-light-green-outline"
                  style={{ width: '100%', justifyContent: 'center', padding: '10px 10px', fontSize: '0.84rem', fontWeight: 800, background: '#f7fbf8' }}
                  title="Open instant factory quote form"
                >
                  ⚡ Instant RFQ
                </button>

                <button
                  type="button"
                  onClick={() => addSample(product)}
                  className="btn btn-light-green-outline"
                  style={{ width: '100%', justifyContent: 'center', padding: '10px 10px', fontSize: '0.84rem', fontWeight: 700, background: '#ffffff' }}
                  title="Request free evaluation sample pieces"
                >
                  📦 Free Sample
                </button>
              </div>

              {/* Simple & Clean Dispatch Info Micro-Grid (Zero Text Overlap) */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '4px', 
                marginTop: '14px', 
                padding: '9px 12px',
                background: '#ffffff',
                border: '1px solid #ddecde',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div>
                  <span style={{ color: '#7a9485', display: 'block', fontSize: '0.66rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.3px' }}>
                    📦 Minimum MOQ
                  </span>
                  <strong style={{ color: '#1b4332', fontSize: '0.78rem', display: 'block', marginTop: '2px' }}>
                    {product.moq || 2000} pcs
                  </strong>
                </div>
                <div style={{ borderLeft: '1px solid #e5ebe7', borderRight: '1px solid #e5ebe7' }}>
                  <span style={{ color: '#7a9485', display: 'block', fontSize: '0.66rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.3px' }}>
                    ⏱️ Dispatch
                  </span>
                  <strong style={{ color: '#1b4332', fontSize: '0.78rem', display: 'block', marginTop: '2px' }}>
                    24-48 Hours
                  </strong>
                </div>
                <div>
                  <span style={{ color: '#7a9485', display: 'block', fontSize: '0.66rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.3px' }}>
                    🚛 Logistics
                  </span>
                  <strong style={{ color: '#1b4332', fontSize: '0.78rem', display: 'block', marginTop: '2px' }}>
                    Pan-India FCL/LCL
                  </strong>
                </div>
              </div>
            </div>

            {/* Instant Proforma RFQ Popup Modal */}
            {isRfqModalOpen && (
              <div 
                onClick={() => setIsRfqModalOpen(false)}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(10, 30, 20, 0.75)',
                  backdropFilter: 'blur(8px)',
                  zIndex: 99999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px'
                }}
              >
                <div 
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: '#ffffff',
                    borderRadius: '24px',
                    width: '100%',
                    maxWidth: '540px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
                    border: '1.5px solid #ddecde',
                    animation: 'fadeInUp 0.25s ease-out'
                  }}
                >
                  {/* Modal Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: '20px 24px',
                    borderBottom: '1px solid #eef3ef',
                    background: 'linear-gradient(180deg, #f7faf8 0%, #ffffff 100%)'
                  }}>
                    <div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#dcfce7', color: '#15803d', fontSize: '0.74rem', fontWeight: 800, padding: '3px 10px', borderRadius: '999px', marginBottom: '6px' }}>
                        ⚡ Direct Factory Proforma RFQ
                      </div>
                      <h3 style={{ fontSize: '1.25rem', color: '#1b4332', margin: 0, fontWeight: 800 }}>
                        {product.title}
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: '#52796f', margin: '4px 0 0' }}>
                        Volume: <strong>{selectedVolume.toLocaleString()} pcs</strong> • Rate: <strong>₹{unitRate}/pc</strong> • Est. Total: <strong>₹{estTotal}</strong> ({totalCartons} Cartons)
                      </p>
                    </div>

                    <button 
                      type="button" 
                      onClick={() => setIsRfqModalOpen(false)}
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        background: '#f0f4f1',
                        border: 'none',
                        color: '#1b4332',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                      title="Close"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div style={{ padding: '24px' }}>
                    {rfqSubmitted ? (
                      <div style={{ background: '#dcfce7', border: '1px solid #86efac', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>✓</div>
                        <strong style={{ color: '#15803d', display: 'block', fontSize: '1.1rem', fontWeight: 800 }}>
                          Proforma RFQ Dispatched!
                        </strong>
                        <p style={{ fontSize: '0.86rem', color: '#166534', margin: '8px 0 16px', lineHeight: '1.5' }}>
                          Our commercial production desk has received your request for {selectedVolume.toLocaleString()} units of {product.title}. An official invoice quote with GST and transport estimate will be sent to your WhatsApp.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setRfqSubmitted(false);
                            setIsRfqModalOpen(false);
                          }}
                          className="btn btn-primary-green"
                          style={{ padding: '8px 20px', fontSize: '0.84rem' }}
                        >
                          Close Window
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleRfq} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#1b4332', marginBottom: '4px' }}>
                              Contact Name *
                            </label>
                            <input 
                              type="text"
                              required
                              placeholder="e.g. Ramesh Sharma"
                              value={rfqForm.name}
                              onChange={(e) => setRfqForm({...rfqForm, name: e.target.value})}
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.86rem', boxSizing: 'border-box' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#1b4332', marginBottom: '4px' }}>
                              WhatsApp Mobile *
                            </label>
                            <input 
                              type="tel"
                              required
                              placeholder="e.g. +91 98765 43210"
                              value={rfqForm.phone}
                              onChange={(e) => setRfqForm({...rfqForm, phone: e.target.value})}
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.86rem', boxSizing: 'border-box' }}
                            />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#1b4332', marginBottom: '4px' }}>
                              Company / Restaurant / Brand
                            </label>
                            <input 
                              type="text"
                              placeholder="e.g. Haldiram / Cloud Kitchen"
                              value={rfqForm.company}
                              onChange={(e) => setRfqForm({...rfqForm, company: e.target.value})}
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.86rem', boxSizing: 'border-box' }}
                            />
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: '#1b4332', marginBottom: '4px' }}>
                              Delivery Destination City / Pin
                            </label>
                            <input 
                              type="text"
                              placeholder="e.g. Mumbai 400001"
                              value={rfqForm.city}
                              onChange={(e) => setRfqForm({...rfqForm, city: e.target.value})}
                              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.86rem', boxSizing: 'border-box' }}
                            />
                          </div>
                        </div>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#1b4332', cursor: 'pointer', background: '#f7faf8', padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddecde' }}>
                          <input 
                            type="checkbox"
                            checked={rfqForm.customDeboss}
                            onChange={(e) => setRfqForm({...rfqForm, customDeboss: e.target.checked})}
                          />
                          <span>Include Custom Brand Logo Debossing Tooling quotation</span>
                        </label>

                        <button 
                          type="submit" 
                          className="btn btn-primary-green"
                          style={{ width: '100%', justifyContent: 'center', padding: '12px 18px', fontSize: '0.92rem', fontWeight: 800, marginTop: '4px' }}
                        >
                          Send Proforma RFQ for {selectedVolume.toLocaleString()} pcs
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ========================================================
            HERO STORY BANNER (From WordPress Template Section)
            ======================================================== */}
        {product.templateHero && (
          <div className="industry-grid-responsive" style={{ background: '#f0fbf4', border: '1.5px solid #b7e4c7', borderRadius: '24px', padding: '36px', marginBottom: '40px' }}>
            <div>
              <span className="light-green-tag">Factory Innovation</span>
              <h2 style={{ fontSize: '1.8rem', color: '#1b4332', margin: '8px 0 14px', lineHeight: '1.3' }}>
                Engineered for Responsible Commercial Dining
              </h2>
              <p style={{ color: '#486153', fontSize: '1rem', lineHeight: '1.7', marginBottom: '16px' }}>
                {product.templateHero.text}
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.86rem', color: '#15803d', fontWeight: 700 }}>✓ Zero Tree Cutting</span>
                <span style={{ fontSize: '0.86rem', color: '#15803d', fontWeight: 700 }}>✓ Unbleached Natural Pulp</span>
                <span style={{ fontSize: '0.86rem', color: '#15803d', fontWeight: 700 }}>✓ Water & Grease Proof</span>
              </div>
            </div>

            {product.templateHero.image && (
              <div style={{ textAlign: 'center', background: '#ffffff', borderRadius: '18px', padding: '20px', border: '1px solid #b7e4c7' }}>
                <img 
                  src={product.templateHero.image} 
                  alt={product.title} 
                  style={{ maxHeight: '280px', maxWidth: '100%', objectFit: 'contain', margin: '0 auto' }}
                />
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            WOOCOMMERCE STYLE SPECIFICATIONS & DETAILS TABS
            ======================================================== */}
        <div className="spotlight-card-responsive" style={{ background: '#ffffff', border: '1.5px solid #ddecde', marginBottom: '64px', boxShadow: '0 8px 30px rgba(45, 106, 79, 0.05)' }}>
          
          {/* Tab Navigation */}
          <div className="product-tabs-header">
            <button
              type="button"
              onClick={() => setActiveTab('visuals')}
              style={{
                padding: '10px 22px',
                borderRadius: '999px',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                background: activeTab === 'visuals' ? '#2d6a4f' : '#f0fbf4',
                color: activeTab === 'visuals' ? '#ffffff' : '#2d6a4f',
                transition: 'all 0.2s'
              }}
            >
              📸 Visual Features & Product Photos ({product.visualFeatures?.length || 4})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              style={{
                padding: '10px 22px',
                borderRadius: '999px',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                background: activeTab === 'specs' ? '#2d6a4f' : '#f0fbf4',
                color: activeTab === 'specs' ? '#ffffff' : '#2d6a4f',
                transition: 'all 0.2s'
              }}
            >
              📐 Technical Specifications & Logistics
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('certs')}
              style={{
                padding: '10px 22px',
                borderRadius: '999px',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                background: activeTab === 'certs' ? '#2d6a4f' : '#f0fbf4',
                color: activeTab === 'certs' ? '#ffffff' : '#2d6a4f',
                transition: 'all 0.2s'
              }}
            >
              🛡️ Lab Certifications & Testing
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('custom')}
              style={{
                padding: '10px 22px',
                borderRadius: '999px',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                background: activeTab === 'custom' ? '#2d6a4f' : '#f0fbf4',
                color: activeTab === 'custom' ? '#ffffff' : '#2d6a4f',
                transition: 'all 0.2s'
              }}
            >
              🏷️ Custom Branding & Logo Deboss
            </button>
          </div>

          {/* TAB 1: VISUAL FEATURES WITH REAL PHOTOGRAPHS */}
          {activeTab === 'visuals' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <span className="light-green-tag">Factory Showcase</span>
                <h3 style={{ fontSize: '1.6rem', color: '#1b4332', margin: '6px 0 8px' }}>
                  Aesthetic Excellence & Commercial Strength
                </h3>
                <p style={{ color: '#486153', fontSize: '0.96rem' }}>
                  Examine detailed high-resolution angles, texturing, and structural finish captured directly from our production lines.
                </p>
              </div>

              {/* Rich Visual Feature Cards Grid */}
              {product.visualFeatures && product.visualFeatures.length > 0 ? (
                <div className="grid-2-responsive">
                  {product.visualFeatures.map((feat, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        background: '#f7faf8', 
                        border: '1.5px solid #ddecde', 
                        borderRadius: '18px', 
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                      }}
                    >
                      {feat.image && (
                        <div style={{ background: '#ffffff', height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', borderBottom: '1px solid #ddecde', overflow: 'hidden' }}>
                          <img 
                            src={feat.image} 
                            alt={feat.title} 
                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', transition: 'transform 0.3s ease' }}
                          />
                        </div>
                      )}
                      <div style={{ padding: '22px', flexGrow: 1 }}>
                        <h4 style={{ color: '#1b4332', fontSize: '1.25rem', marginBottom: '8px' }}>
                          {feat.title || 'Precision Molded Tableware'}
                        </h4>
                        <p style={{ color: '#486153', fontSize: '0.92rem', lineHeight: '1.6' }}>
                          {feat.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid-3-responsive">
                  <div style={{ background: '#f7fbf8', border: '1px solid #ddecde', borderRadius: '16px', padding: '24px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>✨</div>
                    <h4 style={{ color: '#1b4332', fontSize: '1.15rem', marginBottom: '8px' }}>Elegantly Bright White</h4>
                    <p style={{ color: '#486153', fontSize: '0.88rem', lineHeight: '1.55' }}>
                      Clean, non-bleached natural finish enhances gourmet food presentation, complementing both luxury banquet tables and takeaway deliveries.
                    </p>
                  </div>

                  <div style={{ background: '#f7fbf8', border: '1px solid #ddecde', borderRadius: '16px', padding: '24px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🛡️</div>
                    <h4 style={{ color: '#1b4332', fontSize: '1.15rem', marginBottom: '8px' }}>Zero Bottom Sogginess</h4>
                    <p style={{ color: '#486153', fontSize: '0.88rem', lineHeight: '1.55' }}>
                      Interwoven plant fibers breathe to release excess steam while maintaining an impenetrable barrier against boiling gravies and hot oils.
                    </p>
                  </div>

                  <div style={{ background: '#f7fbf8', border: '1px solid #ddecde', borderRadius: '16px', padding: '24px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💪</div>
                    <h4 style={{ color: '#1b4332', fontSize: '1.15rem', marginBottom: '8px' }}>High Structural Rigidity</h4>
                    <p style={{ color: '#486153', fontSize: '0.88rem', lineHeight: '1.55' }}>
                      Engineered under 300-ton hydraulic compression moulds, ensuring the outer rim lip never buckles or sags under heavy catering portions.
                    </p>
                  </div>
                </div>
              )}

              {/* 4 Official Degradation Badges from Ecolates Site */}
              <div style={{ marginTop: '36px', background: '#f0fbf4', border: '1.5px solid #b7e4c7', borderRadius: '18px', padding: '28px' }}>
                <h4 style={{ fontSize: '1.25rem', color: '#1b4332', marginBottom: '16px' }}>
                  Ecolates Certified Degradation & Thermal Testing Standards
                </h4>

                <div className="grid-4-responsive">
                  <div style={{ background: '#ffffff', borderRadius: '14px', padding: '18px', border: '1px solid #b7e4c7', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.2rem', marginBottom: '6px' }}>🌱</div>
                    <h5 style={{ fontSize: '0.95rem', color: '#1b4332', marginBottom: '6px' }}>Compostable</h5>
                    <p style={{ fontSize: '0.78rem', color: '#486153', lineHeight: '1.4' }}>
                      Breaks down into nutrient-rich organic compost within 90 days in commercial & home facilities.
                    </p>
                  </div>

                  <div style={{ background: '#ffffff', borderRadius: '14px', padding: '18px', border: '1px solid #b7e4c7', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.2rem', marginBottom: '6px' }}>❄️</div>
                    <h5 style={{ fontSize: '0.95rem', color: '#1b4332', marginBottom: '6px' }}>Refrigerator Safe</h5>
                    <p style={{ fontSize: '0.78rem', color: '#486153', lineHeight: '1.4' }}>
                      Designed to withstand deep freeze (-20°C) without cracking, moisture loss, or structural distortion.
                    </p>
                  </div>

                  <div style={{ background: '#ffffff', borderRadius: '14px', padding: '18px', border: '1px solid #b7e4c7', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.2rem', marginBottom: '6px' }}>♨️</div>
                    <h5 style={{ fontSize: '0.95rem', color: '#1b4332', marginBottom: '6px' }}>Microwave Safe</h5>
                    <p style={{ fontSize: '0.78rem', color: '#486153', lineHeight: '1.4' }}>
                      Safe up to 120°C for food reheating in commercial ovens and microwaves without releasing harmful toxins.
                    </p>
                  </div>

                  <div style={{ background: '#ffffff', borderRadius: '14px', padding: '18px', border: '1px solid #b7e4c7', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.2rem', marginBottom: '6px' }}>🚚</div>
                    <h5 style={{ fontSize: '0.95rem', color: '#1b4332', marginBottom: '6px' }}>Fast Delivery</h5>
                    <p style={{ fontSize: '0.78rem', color: '#486153', lineHeight: '1.4' }}>
                      Readily stocked in high volumes at central warehouse. Dispatched within 24 to 48 business hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICAL SPECIFICATIONS & LOGISTICS TABLE */}
          {activeTab === 'specs' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="light-green-tag">B2B Commercial Master Specs</span>
                <h3 style={{ fontSize: '1.6rem', color: '#1b4332', margin: '6px 0 8px' }}>
                  Carton Dimensions, Freight CBM & Quality Tolerances
                </h3>
                <p style={{ color: '#486153', fontSize: '0.96rem' }}>
                  Exact case packing quantities, weights, and container packing limits for domestic fleet and ocean container shipping.
                </p>
              </div>

              {/* Structured Specifications Table */}
              <div className="table-responsive" style={{ border: '1.5px solid #ddecde', borderRadius: '16px', overflowX: 'auto', marginBottom: '28px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
                  <thead>
                    <tr style={{ background: '#f0fbf4', borderBottom: '2px solid #b7e4c7' }}>
                      <th style={{ padding: '14px 20px', textAlign: 'left', color: '#1b4332', fontWeight: 800 }}>Specification Parameter</th>
                      <th style={{ padding: '14px 20px', textAlign: 'left', color: '#1b4332', fontWeight: 800 }}>Factory Measured Value</th>
                      <th style={{ padding: '14px 20px', textAlign: 'left', color: '#1b4332', fontWeight: 800 }}>Quality Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #eef5f0' }}>
                      <td style={{ padding: '14px 20px', color: '#486153', fontWeight: 600 }}>Quantity Per Master Case</td>
                      <td style={{ padding: '14px 20px', color: '#1b4332', fontWeight: 700 }}>
                        {product.parsedSpecs?.qtyPerCase || pcsPerCarton} Pieces
                      </td>
                      <td style={{ padding: '14px 20px', color: '#7a9485' }}>Packed in sterile hygienic sleeves</td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #eef5f0', background: '#fafdfa' }}>
                      <td style={{ padding: '14px 20px', color: '#486153', fontWeight: 600 }}>Single Piece Weight</td>
                      <td style={{ padding: '14px 20px', color: '#1b4332', fontWeight: 700 }}>
                        {product.parsedSpecs?.itemWeight || '5.0 – 21.0 grams'} (±5% tolerance)
                      </td>
                      <td style={{ padding: '14px 20px', color: '#7a9485' }}>High-density agro-compression</td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #eef5f0' }}>
                      <td style={{ padding: '14px 20px', color: '#486153', fontWeight: 600 }}>Sleeve Packing Configuration</td>
                      <td style={{ padding: '14px 20px', color: '#1b4332', fontWeight: 700 }}>
                        {product.parsedSpecs?.packing || '50 pcs × 20 packs'}
                      </td>
                      <td style={{ padding: '14px 20px', color: '#7a9485' }}>Tear-resistant moisture shrink wrap</td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #eef5f0', background: '#fafdfa' }}>
                      <td style={{ padding: '14px 20px', color: '#486153', fontWeight: 600 }}>Case Net Weight</td>
                      <td style={{ padding: '14px 20px', color: '#1b4332', fontWeight: 700 }}>
                        {product.parsedSpecs?.caseNetWeight || '5.0 kg'}
                      </td>
                      <td style={{ padding: '14px 20px', color: '#7a9485' }}>Tare calibrated digital scales</td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #eef5f0' }}>
                      <td style={{ padding: '14px 20px', color: '#486153', fontWeight: 600 }}>Case Gross Weight</td>
                      <td style={{ padding: '14px 20px', color: '#1b4332', fontWeight: 700 }}>
                        {product.parsedSpecs?.caseGrossWeight || '5.7 kg'}
                      </td>
                      <td style={{ padding: '14px 20px', color: '#7a9485' }}>Includes 5-ply corrugated carton</td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #eef5f0', background: '#fafdfa' }}>
                      <td style={{ padding: '14px 20px', color: '#486153', fontWeight: 600 }}>Case Dimensions (Metric)</td>
                      <td style={{ padding: '14px 20px', color: '#1b4332', fontWeight: 700 }}>
                        {product.parsedSpecs?.dimensionsCm || '49.5 × 25.5 × 25.5 cm'}
                      </td>
                      <td style={{ padding: '14px 20px', color: '#7a9485' }}>Standard pallet stackable</td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #eef5f0' }}>
                      <td style={{ padding: '14px 20px', color: '#486153', fontWeight: 600 }}>Case Dimensions (Imperial)</td>
                      <td style={{ padding: '14px 20px', color: '#1b4332', fontWeight: 700 }}>
                        {product.parsedSpecs?.dimensionsInch || '19.50" × 10.00" × 10.00"'}
                      </td>
                      <td style={{ padding: '14px 20px', color: '#7a9485' }}>Export air & ocean compliant</td>
                    </tr>

                    <tr style={{ borderBottom: '1px solid #eef5f0', background: '#fafdfa' }}>
                      <td style={{ padding: '14px 20px', color: '#486153', fontWeight: 600 }}>CBM Per Master Case</td>
                      <td style={{ padding: '14px 20px', color: '#1b4332', fontWeight: 700 }}>
                        {product.parsedSpecs?.cbmPerCase || '0.032'} m³
                      </td>
                      <td style={{ padding: '14px 20px', color: '#7a9485' }}>Volume optimized freight</td>
                    </tr>

                    <tr>
                      <td style={{ padding: '14px 20px', color: '#486153', fontWeight: 600 }}>Total Cases in 40ft HQ Container</td>
                      <td style={{ padding: '14px 20px', color: '#15803d', fontWeight: 800 }}>
                        {product.parsedSpecs?.container40ftQty ? `${parseInt(product.parsedSpecs.container40ftQty).toLocaleString()} Cartons` : '2,120 Cartons (approx. 2.1M pcs)'}
                      </td>
                      <td style={{ padding: '14px 20px', color: '#7a9485' }}>Direct factory export loading</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: LAB TEST REPORTS & CERTIFICATIONS */}
          {activeTab === 'certs' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="light-green-tag">Certified Compliance</span>
                <h3 style={{ fontSize: '1.6rem', color: '#1b4332', margin: '6px 0 8px' }}>
                  Global Third-Party Lab Reports & Audits
                </h3>
                <p style={{ color: '#486153', fontSize: '0.96rem' }}>
                  Every Ecolates manufacturing batch undergoes stringent chemical, microbial, and hot grease leak tests.
                </p>
              </div>

              <div className="grid-2-responsive">
                <div style={{ background: '#f0fbf4', border: '1.5px solid #b7e4c7', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                      📋
                    </div>
                    <div>
                      <h4 style={{ color: '#1b4332', fontSize: '1.15rem' }}>ISO 22000:2018 Certified</h4>
                      <small style={{ color: '#15803d', fontWeight: 700 }}>Food Safety Management System (FSMS)</small>
                    </div>
                  </div>
                  <p style={{ color: '#486153', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '14px' }}>
                    Certified clean-room environment adhering strictly to international HACCP food-contact manufacturing standards.
                  </p>
                  <a href="/certifications" style={{ color: '#2d6a4f', fontWeight: 700, fontSize: '0.86rem' }}>
                    View Official Certificate Scan
                  </a>
                </div>

                <div style={{ background: '#f0fbf4', border: '1.5px solid #b7e4c7', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                      🔬
                    </div>
                    <div>
                      <h4 style={{ color: '#1b4332', fontSize: '1.15rem' }}>PFAS-Free Lab Verification (2024)</h4>
                      <small style={{ color: '#15803d', fontWeight: 700 }}>Zero Organic Fluorine (Total Fluorine &lt; 50 ppm)</small>
                    </div>
                  </div>
                  <p style={{ color: '#486153', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '14px' }}>
                    Tested via combustion ion chromatography ensuring 0% toxic fluorochemicals or forever chemicals leach into food.
                  </p>
                  <a href="/certifications" style={{ color: '#2d6a4f', fontWeight: 700, fontSize: '0.86rem' }}>
                    Download PFAS Lab Test PDF
                  </a>
                </div>

                <div style={{ background: '#f0fbf4', border: '1.5px solid #b7e4c7', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                      💧
                    </div>
                    <div>
                      <h4 style={{ color: '#1b4332', fontSize: '1.15rem' }}>Hot Oil & Leak Proof Strength Report</h4>
                      <small style={{ color: '#15803d', fontWeight: 700 }}>Boiling Water (100°C) & Cooking Oil (120°C)</small>
                    </div>
                  </div>
                  <p style={{ color: '#486153', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '14px' }}>
                    Maintains structural integrity for &gt; 4 hours under boiling liquid soup and Indian curry gravies without seep-through.
                  </p>
                  <a href="/certifications" style={{ color: '#2d6a4f', fontWeight: 700, fontSize: '0.86rem' }}>
                    Download Leak Test Report PDF
                  </a>
                </div>

                <div style={{ background: '#f0fbf4', border: '1.5px solid #b7e4c7', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                      🌱
                    </div>
                    <div>
                      <h4 style={{ color: '#1b4332', fontSize: '1.15rem' }}>BPI & EN 13432 Compostability</h4>
                      <small style={{ color: '#15803d', fontWeight: 700 }}>100% Soil Biodegradation</small>
                    </div>
                  </div>
                  <p style={{ color: '#486153', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '14px' }}>
                    Disintegrates into organic biomass within 90 days leaving zero microplastics or heavy metal trace in soil.
                  </p>
                  <a href="/certifications" style={{ color: '#2d6a4f', fontWeight: 700, fontSize: '0.86rem' }}>
                    View Compost Verification
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOM BRANDING & DEBOSSING */}
          {activeTab === 'custom' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="light-green-tag">OEM Customization</span>
                <h3 style={{ fontSize: '1.6rem', color: '#1b4332', margin: '6px 0 8px' }}>
                  Custom Logo Debossing for QSR & Hotel Chains
                </h3>
                <p style={{ color: '#486153', fontSize: '0.96rem' }}>
                  Elevate your brand presence by stamping your restaurant or cloud kitchen emblem directly into the sugarcane bagasse base or rim.
                </p>
              </div>

              <div className="grid-3-responsive">
                <div style={{ background: '#f7faf8', border: '1px solid #ddecde', borderRadius: '14px', padding: '22px' }}>
                  <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '8px' }}>🎨</span>
                  <strong style={{ color: '#1b4332', display: 'block', fontSize: '1.05rem', marginBottom: '6px' }}>CNC Die Tooling</strong>
                  <p style={{ color: '#486153', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    Custom brass or steel tooling die made to your brand vector artwork. One-time setup fee applicable.
                  </p>
                </div>

                <div style={{ background: '#f7faf8', border: '1px solid #ddecde', borderRadius: '14px', padding: '22px' }}>
                  <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '8px' }}>📦</span>
                  <strong style={{ color: '#1b4332', display: 'block', fontSize: '1.05rem', marginBottom: '6px' }}>Custom MOQ</strong>
                  <p style={{ color: '#486153', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    Minimum order of 50,000 pieces per production run for custom-debossed commercial batches.
                  </p>
                </div>

                <div style={{ background: '#f7faf8', border: '1px solid #ddecde', borderRadius: '14px', padding: '22px' }}>
                  <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '8px' }}>⏱️</span>
                  <strong style={{ color: '#1b4332', display: 'block', fontSize: '1.05rem', marginBottom: '6px' }}>Lead Time</strong>
                  <p style={{ color: '#486153', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    7-10 business days for tooling proof sample approval, followed by 14 days for full dispatch.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Related Products Grid */}
        {related && related.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span className="light-green-tag">Frequently Paired Items</span>
                <h3 style={{ fontSize: '1.7rem', color: '#1b4332', margin: '6px 0 0' }}>Recommended Commercial Pairings</h3>
              </div>
              <a href="/products" style={{ color: '#2d6a4f', fontWeight: 700, fontSize: '0.9rem' }}>
                View Full Catalog
              </a>
            </div>

            <div className="product-grid">
              {related.map((r) => (
                <div key={r.id} className="product-card">
                  <a href={`/products/${r.slug}`} className="card-img-wrap">
                    <img src={r.featuredImage} alt={r.title} loading="lazy" />
                  </a>
                  <div className="product-card-body">
                    <span className="product-cat-tag">{r.category}</span>
                    <a href={`/products/${r.slug}`}>
                      <h4 className="product-card-title">{r.title}</h4>
                    </a>
                    <div className="product-card-footer">
                      <div className="card-price-col">
                        <span className="card-price-sub">Factory Rate</span>
                        <span className="card-price-val">{r.price}</span>
                      </div>
                      <div className="card-actions-row">
                        <button
                          type="button"
                          onClick={() => addSample(r)}
                          className="btn btn-light-green-outline"
                          style={{ padding: '6px 10px', fontSize: '0.76rem' }}
                        >
                          + Sample
                        </button>
                        <a 
                          href={`/products/${r.slug}`} 
                          className="btn btn-primary-green" 
                          style={{ padding: '6px 12px', fontSize: '0.76rem' }}
                        >
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
