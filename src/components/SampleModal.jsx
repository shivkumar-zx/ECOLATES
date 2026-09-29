'use client';

import React, { useState, useEffect } from 'react';
import allProducts from '../data/products.json';

export default function SampleModal({ isOpen, onClose, selectedItems = [], onClearCart, user }) {
  const defaultSampleIds = [1679, 2877, 2820, 1674]; // Default 4 top products

  const [selectedProductIds, setSelectedProductIds] = useState(() => {
    if (selectedItems && selectedItems.length > 0) {
      return selectedItems.map(item => item.id);
    }
    return defaultSampleIds;
  });

  const [sampleSearch, setSampleSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    phone: '',
    city: '',
    address: ''
  });

  // Pre-fill from logged-in user if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.name || '',
        brand: prev.brand || user.company || '',
        phone: prev.phone || user.phone || ''
      }));
    }
  }, [user]);

  // Keep in sync with newly added items from outside "+ Sample" clicks
  useEffect(() => {
    if (selectedItems && selectedItems.length > 0) {
      const ids = selectedItems.map(i => i.id);
      setSelectedProductIds(prev => Array.from(new Set([...prev, ...ids])));
    }
  }, [selectedItems]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleProduct = (productId) => {
    if (selectedProductIds.includes(productId)) {
      setSelectedProductIds(selectedProductIds.filter(id => id !== productId));
    } else {
      if (selectedProductIds.length >= 6) {
        alert('You have reached the maximum limit of 6 free evaluation sample units per kit.');
        return;
      }
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };

  const selectPreset = (type) => {
    if (type === 'qsr') {
      const qsrIds = allProducts.filter(p => p.categorySlug === 'containers' || p.categorySlug === 'trays').slice(0, 4).map(p => p.id);
      setSelectedProductIds(qsrIds);
    } else if (type === 'catering') {
      const catIds = allProducts.filter(p => p.categorySlug === 'plates' || p.categorySlug === 'trays').slice(0, 4).map(p => p.id);
      setSelectedProductIds(catIds);
    } else if (type === 'bowls') {
      const bwlIds = allProducts.filter(p => p.categorySlug === 'bowls').slice(0, 4).map(p => p.id);
      setSelectedProductIds(bwlIds);
    }
  };

  const filteredProducts = allProducts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(sampleSearch.toLowerCase()) || p.category.toLowerCase().includes(sampleSearch.toLowerCase());
    const matchesCat = filterCategory === 'all' || p.categorySlug === filterCategory;
    return matchesSearch && matchesCat;
  });

  const selectedProductsObjects = allProducts.filter(p => selectedProductIds.includes(p.id));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedProductIds.length === 0) {
      alert('Please select at least 1 product sample for your evaluation kit.');
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Sample Kit Custom Dispatch',
          ...formData,
          sampleCount: selectedProductIds.length,
          items: selectedProductsObjects.map(item => `${item.title} (SKU: ${item.sku})`)
        })
      });
      setIsSubmitted(true);
      if (onClearCart) onClearCart();
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleResetAndClose} style={{ zIndex: 100000, padding: '20px' }}>
      <div 
        className="big-modal-dialog" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '1120px', 
          width: '100%', 
          maxHeight: '90vh', 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: '24px',
          overflow: 'hidden',
          padding: 0
        }}
      >
        {/* Header Bar */}
        <div style={{ background: '#f0fbf4', borderBottom: '1.5px solid #b7e4c7', padding: '24px 32px', position: 'relative' }}>
          <button 
            type="button" 
            onClick={handleResetAndClose} 
            className="modal-close-btn" 
            title="Close"
            style={{ top: '20px', right: '20px' }}
          >
            ✕
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="light-green-tag" style={{ background: '#2d6a4f', color: '#fff' }}>
              Complimentary B2B Evaluation Kit
            </span>
            <span style={{ fontSize: '0.74rem', background: '#dcfce7', color: '#15803d', fontWeight: 800, padding: '3px 10px', borderRadius: '999px', border: '1px solid #86efac' }}>
              Free Air Courier • Zero Product Cost
            </span>
          </div>

          <h2 style={{ fontSize: '1.85rem', color: '#1b4332', margin: '4px 0 4px', lineHeight: '1.2' }}>
            Customize & Request Your Commercial Sample Box
          </h2>
          <p style={{ color: '#486153', fontSize: '0.92rem', margin: 0 }}>
            Select up to 6 sugarcane tableware pieces to evaluate finish, rigidity, and leak-resistance in your kitchen.
          </p>
        </div>

        {/* Content Body */}
        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '56px 24px', overflowY: 'auto' }}>
            <div style={{ fontSize: '4.5rem', marginBottom: '16px' }}>🎉</div>
            <h3 style={{ fontSize: '2.1rem', color: '#1b4332', marginBottom: '10px' }}>Evaluation Sample Kit Confirmed!</h3>
            <p style={{ color: '#486153', maxWidth: '520px', margin: '0 auto 24px', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Your selected <strong>{selectedProductIds.length} sample units</strong> have been scheduled for direct factory packing. Our logistics desk will WhatsApp air courier tracking details within 24 hours.
            </p>
            <div style={{ background: '#f0fbf4', border: '1.5px solid #b7e4c7', borderRadius: '16px', padding: '20px', maxWidth: '520px', margin: '0 auto 28px', textAlign: 'left' }}>
              <strong style={{ color: '#1b4332', fontSize: '0.92rem', display: 'block', marginBottom: '10px' }}>
                Included in Your Express Dispatch:
              </strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.86rem', color: '#486153' }}>
                {selectedProductsObjects.map((p, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓</span>
                    <span>{p.title} <small style={{ color: '#7a9485' }}>({p.category})</small></span>
                  </div>
                ))}
              </div>
            </div>
            <button type="button" onClick={handleResetAndClose} className="btn btn-primary-green btn-lg">
              Return to Catalog
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', overflow: 'hidden', flexGrow: 1 }}>
            
            {/* Left Column: Product Selection Grid (Clean Vertical Flow - Zero Horizontal Slide) */}
            <div style={{ padding: '24px 28px', overflowY: 'auto', overflowX: 'hidden', borderRight: '1.5px solid #ddecde', background: '#fafdfa', display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box' }}>
              
              {/* Step 1 Title & Capacity Counter */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h4 style={{ fontSize: '1.15rem', color: '#1b4332', margin: 0 }}>Step 1: Choose Sample Pieces</h4>
                  <small style={{ color: '#7a9485', fontSize: '0.78rem' }}>Tap any product to add/remove from box</small>
                </div>

                <div style={{ background: '#e8f7ee', border: '1px solid #b7e4c7', borderRadius: '999px', padding: '4px 12px', fontSize: '0.8rem', fontWeight: 800, color: '#1b4332' }}>
                  Selected: <span style={{ color: '#15803d' }}>{selectedProductIds.length} / 6</span> units
                </div>
              </div>

              {/* Quick 1-Click Starter Packs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.74rem', color: '#486153', alignSelf: 'center', fontWeight: 700 }}>Quick Packs:</span>
                <button
                  type="button"
                  onClick={() => selectPreset('qsr')}
                  style={{ fontSize: '0.74rem', padding: '5px 10px', borderRadius: '999px', border: '1px solid #b7e4c7', background: '#fff', cursor: 'pointer', color: '#2d6a4f', fontWeight: 700 }}
                >
                  🛵 QSR & Takeaway
                </button>
                <button
                  type="button"
                  onClick={() => selectPreset('catering')}
                  style={{ fontSize: '0.74rem', padding: '5px 10px', borderRadius: '999px', border: '1px solid #b7e4c7', background: '#fff', cursor: 'pointer', color: '#2d6a4f', fontWeight: 700 }}
                >
                  🍱 Banquet & Thali
                </button>
                <button
                  type="button"
                  onClick={() => selectPreset('bowls')}
                  style={{ fontSize: '0.74rem', padding: '5px 10px', borderRadius: '999px', border: '1px solid #b7e4c7', background: '#fff', cursor: 'pointer', color: '#2d6a4f', fontWeight: 700 }}
                >
                  🍲 Soups & Bowls
                </button>
              </div>

              {/* Filter & Search Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '8px', marginBottom: '14px' }}>
                <input 
                  type="text"
                  placeholder="Search products..."
                  value={sampleSearch}
                  onChange={(e) => setSampleSearch(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #b7e4c7', fontSize: '0.84rem' }}
                />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  style={{ padding: '8px 10px', borderRadius: '10px', border: '1px solid #b7e4c7', fontSize: '0.84rem', background: '#fff' }}
                >
                  <option value="all">All Categories</option>
                  <option value="plates">Plates</option>
                  <option value="bowls">Bowls</option>
                  <option value="trays">Trays</option>
                  <option value="containers">Containers</option>
                </select>
              </div>

              {/* Product Cards Grid (Zero Horizontal Slide) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', maxHeight: '340px', overflowY: 'auto', overflowX: 'hidden', paddingRight: '4px', marginBottom: '14px', width: '100%', boxSizing: 'border-box' }}>
                {filteredProducts.map((p) => {
                  const isChecked = selectedProductIds.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => toggleProduct(p.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        borderRadius: '14px',
                        border: isChecked ? '2px solid #2d6a4f' : '1px solid #ddecde',
                        background: isChecked ? '#e8f7ee' : '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        boxShadow: isChecked ? '0 4px 12px rgba(45, 106, 79, 0.12)' : 'none',
                        minWidth: 0,
                        boxSizing: 'border-box'
                      }}
                    >
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: isChecked ? '2px solid #2d6a4f' : '1.5px solid #b7e4c7', background: isChecked ? '#2d6a4f' : '#fff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 'bold', flexShrink: 0 }}>
                        {isChecked ? '✓' : ''}
                      </div>

                      <img 
                        src={p.featuredImage} 
                        alt="" 
                        style={{ width: '44px', height: '44px', objectFit: 'contain', borderRadius: '8px', background: '#f7fbf8', flexShrink: 0 }} 
                      />

                      <div style={{ overflow: 'hidden', minWidth: 0, flex: 1 }}>
                        <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1b4332', lineHeight: '1.25', wordBreak: 'break-word' }}>
                          {p.title}
                        </span>
                        <small style={{ fontSize: '0.72rem', color: '#7a9485' }}>{p.category}</small>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Items Tag Strip */}
              <div style={{ marginTop: 'auto', borderTop: '1px solid #ddecde', paddingTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.74rem', color: '#486153', fontWeight: 700 }}>
                    Items Packed in Box ({selectedProductIds.length}):
                  </span>
                  {selectedProductIds.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedProductIds([])}
                      style={{ border: 'none', background: 'none', color: '#dc2626', fontSize: '0.72rem', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {selectedProductsObjects.map((p) => (
                    <span 
                      key={p.id}
                      style={{ background: '#2d6a4f', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      {p.title.slice(0, 22)}...
                      <span 
                        onClick={(e) => { e.stopPropagation(); toggleProduct(p.id); }} 
                        style={{ cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        ×
                      </span>
                    </span>
                  ))}
                  {selectedProductIds.length === 0 && (
                    <span style={{ color: '#dc2626', fontSize: '0.76rem' }}>Please select 1 to 6 items to dispatch.</span>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Dispatch Address Form */}
            <div style={{ padding: '24px 28px', overflowY: 'auto', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '14px' }}>
                <h4 style={{ fontSize: '1.15rem', color: '#1b4332', margin: 0 }}>Step 2: Courier Destination</h4>
                <small style={{ color: '#7a9485', fontSize: '0.78rem' }}>Where should we express-ship the sample kit?</small>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#1b4332', marginBottom: '3px' }}>
                    Contact Person Name *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Chef Sanjay or Purchase Head"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.86rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#1b4332', marginBottom: '3px' }}>
                    Restaurant / Brand / Kitchen Name *
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Spice Valley Restaurant"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.86rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#1b4332', marginBottom: '3px' }}>
                      WhatsApp Mobile *
                    </label>
                    <input 
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.86rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#1b4332', marginBottom: '3px' }}>
                      City *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Mumbai"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.86rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#1b4332', marginBottom: '3px' }}>
                    Courier Street Address & Pin Code *
                  </label>
                  <textarea 
                    required
                    rows="2"
                    placeholder="Kitchen premise, shop no, floor, pin code..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.86rem', resize: 'vertical' }}
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting || selectedProductIds.length === 0}
                  className="btn btn-primary-green btn-lg btn-block"
                  style={{ marginTop: '6px' }}
                >
                  {isSubmitting 
                    ? 'Logging Courier Package...' 
                    : `Dispatch My ${selectedProductIds.length} Free Sample Units →`
                  }
                </button>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', fontSize: '0.74rem', color: '#7a9485', marginTop: '4px' }}>
                  <span>✓ 100% Free Service</span>
                  <span>✓ BlueDart Air Express</span>
                </div>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
