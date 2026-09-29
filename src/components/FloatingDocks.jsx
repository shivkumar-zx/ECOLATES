'use client';

import React from 'react';

export default function FloatingDocks({ 
  sampleCount = 0, 
  onOpenSampleModal,
  cartCount = 0,
  onOpenCartModal = () => {}
}) {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDownloadCatalog = () => {
    alert('📄 Ecolates 2026 Master Wholesale Catalog & Rate Card (PDF) initiated. Opening document preview...');
    window.open('https://www.ecolates.com/', '_blank');
  };

  return (
    <>
      {/* LEFT-SIDE FLOATING ACTION DOCK (ICON ONLY -> EXPANDS ON HOVER) */}
      <aside className="floating-dock floating-dock-left" aria-label="Left Quick Navigation">
        {/* Commercial Wholesale Cart */}
        <button 
          type="button" 
          onClick={onOpenCartModal} 
          className="float-dock-btn" 
          id="leftCartBtn" 
          title="Open Commercial Wholesale Cart"
        >
          <span className="dock-icon" style={{ fontSize: '1.1rem' }}>
            🛒
          </span>
          <span className="dock-text">Wholesale Cart</span>
          <span className="badge-mini" style={{ background: '#16a34a' }}>{cartCount}</span>
        </button>

        <button 
          type="button" 
          onClick={onOpenSampleModal} 
          className="float-dock-btn" 
          id="leftSampleBtn" 
          title="Free Sample Box Evaluation Kit"
        >
          <span className="dock-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </span>
          <span className="dock-text">Free Sample Box</span>
          <span className="badge-mini">{sampleCount}</span>
        </button>

        <a href="/#productChecks" className="float-dock-btn" title="6-Point Quality & Compliance Check">
          <span className="dock-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2v6a2 2 0 0 0 2 2h6"/>
              <path d="M4 16v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2"/>
              <polyline points="9 16 11 18 15 14"/>
            </svg>
          </span>
          <span className="dock-text">Lab Quality Check</span>
        </a>

        <button 
          type="button" 
          onClick={handleDownloadCatalog} 
          className="float-dock-btn" 
          title="Download 2026 Wholesale Spec Catalog"
        >
          <span className="dock-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="18" x2="12" y2="12"/>
              <line x1="9" y1="15" x2="12" y2="18"/>
              <line x1="15" y1="15" x2="12" y2="18"/>
            </svg>
          </span>
          <span className="dock-text">Download 2026 Catalog</span>
        </button>

        <a href="/#camStudio" className="float-dock-btn" title="360° Interactive Cam Studio">
          <span className="dock-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              <path d="M2 12h20"/>
            </svg>
          </span>
          <span className="dock-text">360° Inspection Cam</span>
        </a>
      </aside>

      {/* RIGHT-SIDE FLOATING ACTION DOCK (ICON ONLY -> EXPANDS ON HOVER) */}
      <aside className="floating-dock floating-dock-right" aria-label="Right Quick Actions">
        <a href="/#bulkEnquiry" className="float-dock-btn float-rfq-highlight desktop-only-float" title="⚡ Instant Wholesale RFQ">
          <span className="dock-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </span>
          <span className="dock-text">Instant Wholesale RFQ</span>
        </a>

        <a 
          href="https://wa.me/919876543210?text=Hello%20Ecolates,%20I%20want%20to%20inquire%20about%20bulk%20bagasse%20tableware." 
          target="_blank" 
          rel="noopener noreferrer" 
          className="float-dock-btn float-wa-highlight" 
          title="Instant WhatsApp Quote"
        >
          <span className="dock-icon">
            <svg width="22" height="22" fill="#25d366" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
            </svg>
          </span>
          <span className="dock-text">Chat on WhatsApp</span>
        </a>

        <a href="tel:+919876543210" className="float-dock-btn desktop-only-float" title="Call Factory Helpline">
          <span className="dock-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </span>
          <span className="dock-text">+91 98765 43210</span>
        </a>

        <button type="button" onClick={scrollToTop} className="float-dock-btn" title="Back to top">
          <span className="dock-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"/>
            </svg>
          </span>
          <span className="dock-text">Back to Top</span>
        </button>
      </aside>
    </>
  );
}
