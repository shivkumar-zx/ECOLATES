'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/navigation';
import { useRouter } from 'next/navigation';
import productsData from '@/data/products.json';

export default function Header({ 
  sampleCount = 0, 
  onOpenSampleModal, 
  cartCount = 0,
  onOpenCartModal = () => {},
  user = null, 
  onOpenAuthModal = () => {}, 
  onSignOut = () => {} 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const router = useRouter();

  // Close live search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter live matching products as user types
  const qClean = searchQuery.trim().toLowerCase();
  const liveResults = qClean.length >= 1
    ? productsData.filter(p => {
        const titleMatch = (p.title || '').toLowerCase().includes(qClean);
        const catMatch = (p.category || '').toLowerCase().includes(qClean);
        const skuMatch = (p.sku || '').toLowerCase().includes(qClean);
        const descMatch = ((p.overview || '') + ' ' + (p.shortDescription || '')).toLowerCase().includes(qClean);
        return titleMatch || catMatch || skuMatch || descMatch;
      }).slice(0, 5)
    : [];

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setIsDropdownOpen(false);
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectProduct = (slug) => {
    setIsDropdownOpen(false);
    setSearchQuery('');
    router.push(`/products/${slug}`);
  };

  return (
    <>
      {/* 1. TOP MARQUEE TICKER */}
      <div className="top-marquee-bar">
        <div className="marquee-track">
          <div className="marquee-content">
            <span>🌱 <strong>100% Sugarcane Bagasse</strong> — Zero Trees Cut Down</span>
            <span className="marquee-sep">•</span>
            <span>📦 <strong>Free B2B Evaluation Sample Kits</strong> Delivered to Your Kitchen</span>
            <span className="marquee-sep">•</span>
            <span>🏭 <strong>Direct Factory Supply</strong> — Minimum Order Quantity: 5,000 Units</span>
            <span className="marquee-sep">•</span>
            <span>🛡️ <strong>ISO 9001:2015 & BPI Certified</strong> 100% Soil Compostable</span>
            <span className="marquee-sep">•</span>
            <span>🔥 <strong>Microwave (-20°C to 120°C) & Freezer Safe</strong></span>
            <span className="marquee-sep">•</span>
            <span>🚚 <strong>Pan-India Express Dispatch</strong> (Delhi, Mumbai, Bengaluru, Chennai)</span>
            <span className="marquee-sep">•</span>
          </div>
          <div className="marquee-content" aria-hidden="true">
            <span>🌱 <strong>100% Sugarcane Bagasse</strong> — Zero Trees Cut Down</span>
            <span className="marquee-sep">•</span>
            <span>📦 <strong>Free B2B Evaluation Sample Kits</strong> Delivered to Your Kitchen</span>
            <span className="marquee-sep">•</span>
            <span>🏭 <strong>Direct Factory Supply</strong> — Minimum Order Quantity: 5,000 Units</span>
            <span className="marquee-sep">•</span>
            <span>🛡️ <strong>ISO 9001:2015 & BPI Certified</strong> 100% Soil Compostable</span>
            <span className="marquee-sep">•</span>
            <span>🔥 <strong>Microwave (-20°C to 120°C) & Freezer Safe</strong></span>
            <span className="marquee-sep">•</span>
            <span>🚚 <strong>Pan-India Express Dispatch</strong> (Delhi, Mumbai, Bengaluru, Chennai)</span>
            <span className="marquee-sep">•</span>
          </div>
        </div>
      </div>

      {/* 2. TWO-TIER MAIN HEADER */}
      <header className="two-tier-header">
        
        {/* TIER 1: Main Header (Logo, Search, Contact, Sample Box) */}
        <div className="header-main-tier">
          <div className="container main-tier-layout">
            
            {/* Logo */}
            <a href="/" className="brand-logo">
              <div className="logo-mark">
                <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="42" height="42" rx="12" fill="#52b788"/>
                  <path d="M10 29C10 17 19 10 32 10C32 23 23 32 10 32Z" fill="#1b4332"/>
                  <path d="M14 28C18 22 24 16 32 10" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="logo-text">
                <span className="brand-title">ECOLATES</span>
                <span className="brand-tagline">Pure Sugarcane Tableware</span>
              </div>
            </a>

            {/* Centered Live Search with Real-time Dropdown */}
            <div ref={searchContainerRef} className="header-search-wrapper" style={{ position: 'relative' }}>
              <form onSubmit={handleSearch} style={{ width: '100%', margin: 0 }}>
                <div className="search-input-box" style={{ display: 'flex', alignItems: 'center', background: '#f0fbf4', border: '1.5px solid #b7e4c7', borderRadius: '999px', padding: '6px 14px' }}>
                  <button 
                    type="submit" 
                    title="Search catalog"
                    style={{ background: 'transparent', border: 'none', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#2d6a4f' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </button>

                  <input
                    type="text"
                    placeholder="Search tableware (e.g. plates, 5-cp thali, soup bowls, clamshells)..."
                    value={searchQuery}
                    onFocus={() => setIsDropdownOpen(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', padding: '6px 8px', fontSize: '0.86rem', color: '#1b4332' }}
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setIsDropdownOpen(false);
                      }}
                      style={{ background: 'transparent', border: 'none', color: '#7a9485', cursor: 'pointer', fontSize: '0.85rem', padding: '4px' }}
                      title="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </form>

              {/* Live Search Results Dropdown */}
              {isDropdownOpen && searchQuery.trim().length >= 1 && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  right: 0,
                  background: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: '0 12px 36px rgba(10, 30, 20, 0.18)',
                  border: '1.5px solid #ddecde',
                  zIndex: 9999,
                  overflow: 'hidden',
                  maxHeight: '380px',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ padding: '10px 14px', background: '#f7faf8', borderBottom: '1px solid #eef3ef', fontSize: '0.74rem', fontWeight: 800, color: '#2d6a4f', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {liveResults.length > 0 ? `Matching Products (${liveResults.length})` : 'Search Results'}
                  </div>

                  <div style={{ overflowY: 'auto', flex: 1 }}>
                    {liveResults.length > 0 ? (
                      liveResults.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => handleSelectProduct(p.slug)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 14px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #f2f7f4',
                            transition: 'background 0.15s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#f0fbf4'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <img
                            src={p.featuredImage}
                            alt={p.title}
                            style={{
                              width: '42px',
                              height: '42px',
                              objectFit: 'contain',
                              borderRadius: '8px',
                              background: '#f9fbf9',
                              border: '1px solid #e5ebe7',
                              padding: '2px',
                              flexShrink: 0
                            }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1b4332', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {p.title}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                              <span style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 700 }}>{p.price}/pc</span>
                              <span style={{ fontSize: '0.7rem', color: '#7a9485' }}>• {p.category}</span>
                            </div>
                          </div>
                          <span style={{ color: '#2d6a4f', fontSize: '0.82rem', fontWeight: 800 }}>→</span>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '24px 16px', textAlign: 'center', color: '#52796f', fontSize: '0.86rem' }}>
                        <div>🔍 No exact matches for "{searchQuery}"</div>
                        <div style={{ fontSize: '0.76rem', color: '#7a9485', marginTop: '4px' }}>
                          Try searching for <strong>plate</strong>, <strong>thali</strong>, <strong>bowl</strong>, or <strong>box</strong>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* View All Results Button in Dropdown */}
                  <div 
                    onClick={handleSearch}
                    style={{
                      padding: '10px 14px',
                      background: '#f0fbf4',
                      borderTop: '1px solid #ddecde',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      color: '#2d6a4f',
                      textAlign: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    View All Results for "{searchQuery}" in Full Catalog →
                  </div>
                </div>
              )}
            </div>

            {/* Actions: Helpline & Free Sample Box Trigger */}
            <div className="header-actions-group">
              <a href="https://wa.me/919876543210?text=Hi%20Ecolates,%20I%20need%20a%20wholesale%20quote" target="_blank" rel="noopener noreferrer" className="helpline-item">
                <div className="action-icon-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className="action-text-col">
                  <span className="action-sub">B2B Trade Helpline</span>
                  <span className="action-main">+91 98765 43210</span>
                </div>
              </a>

              {/* B2B User Sign In / Account Display */}
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f0fbf4', padding: '6px 12px', borderRadius: '999px', border: '1px solid #b7e4c7' }}>
                  <div style={{ fontSize: '0.78rem', lineHeight: '1.2' }}>
                    <strong style={{ color: '#1b4332', display: 'block' }}>👤 {user.name}</strong>
                    <small style={{ color: '#15803d', fontWeight: 700 }}>{user.company || 'Wholesale Buyer'}</small>
                  </div>
                  <button 
                    type="button" 
                    onClick={onSignOut}
                    style={{ border: '1px solid #fca5a5', background: '#ffffff', color: '#dc2626', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}
                    title="Sign out of trade account"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  type="button" 
                  onClick={onOpenAuthModal} 
                  className="btn btn-light-green-outline"
                  style={{ padding: '8px 14px', fontSize: '0.82rem', fontWeight: 700, borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '6px', background: '#ffffff' }}
                >
                  <span>👤</span>
                  <span>Sign In</span>
                </button>
              )}

              {/* Commercial Wholesale Cart Trigger */}
              <button 
                type="button" 
                onClick={onOpenCartModal} 
                className="sample-cart-trigger" 
                style={{ background: '#f0fbf4', borderColor: '#b7e4c7' }}
                title="Open Commercial Wholesale Cart"
              >
                <div className="sample-icon-wrapper" style={{ background: '#2d6a4f', color: '#ffffff' }}>
                  <span style={{ fontSize: '1.05rem' }}>🛒</span>
                  <span className="sample-badge-count" style={{ background: '#16a34a' }}>{cartCount}</span>
                </div>
                <div className="sample-btn-text">
                  <span className="free-text" style={{ color: '#2d6a4f' }}>WHOLESALE CART</span>
                  <span className="eval-text">{cartCount} {cartCount === 1 ? 'Product' : 'Products'} Selected</span>
                </div>
              </button>

              <button type="button" onClick={onOpenSampleModal} className="sample-cart-trigger" title="Open Free Evaluation Sample Box">
                <div className="sample-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                  <span className="sample-badge-count">{sampleCount}</span>
                </div>
                <div className="sample-btn-text">
                  <span className="free-text">FREE SAMPLE BOX</span>
                  <span className="eval-text">Request Evaluation Kit</span>
                </div>
              </button>
            </div>

          </div>
        </div>

        {/* TIER 2: Clean Navigation */}
        <nav className="header-nav-tier">
          <div className="container nav-tier-layout">
            <ul className="clean-nav-list">
              <li><a href="/" className="nav-item-link">Home</a></li>
              <li><a href="/products" className="nav-item-link">All Products</a></li>
              <li><a href="/products?category=plates" className="nav-item-link">Plates</a></li>
              <li><a href="/products?category=trays" className="nav-item-link">Meal Trays</a></li>
              <li><a href="/products?category=containers" className="nav-item-link">Clamshells</a></li>
              <li><a href="/products?category=bowls" className="nav-item-link">Bowls</a></li>
              <li><a href="/#planetSavings" className="nav-item-link">Planet Savings</a></li>
              <li><a href="/about" className="nav-item-link">About Us</a></li>
              <li><a href="/certifications" className="nav-item-link">Certifications</a></li>
              <li><a href="/#bulkEnquiry" className="nav-item-link">Factory RFQ</a></li>
            </ul>

            <div className="nav-tier-right">
              <a href="#bulkEnquiry" className="admin-nav-pill" style={{ background: '#2d6a4f', color: '#ffffff', borderColor: '#2d6a4f' }} title="Request Wholesale Pricing">
                ⚡ Instant RFQ
              </a>
            </div>
          </div>
        </nav>

      </header>
    </>
  );
}
