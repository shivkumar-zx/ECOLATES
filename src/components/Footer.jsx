import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-layout">
        
        <div className="footer-col">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ width: '32px', height: '32px', background: '#52b788', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1b4332', fontWeight: 'bold' }}>
              🌱
            </div>
            <strong style={{ fontSize: '1.3rem', color: '#ffffff', letterSpacing: '1px' }}>ECOLATES</strong>
          </div>
          <p style={{ lineHeight: '1.6', marginBottom: '16px', maxWidth: '320px', fontSize: '0.86rem' }}>
            India's premier manufacturer of 100% biodegradable and compostable sugarcane bagasse tableware. Direct factory supply for restaurants, cloud kitchens, caterers, and export markets.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.72rem' }}>ISO 9001:2015</span>
            <span style={{ background: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.72rem' }}>BPI Certified</span>
            <span style={{ background: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.72rem' }}>EN 13432</span>
            <span style={{ background: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.72rem' }}>FSSAI Approved</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Commercial Tableware</h4>
          <ul>
            <li><a href="/products?category=plates">Plates & Platters (6" to 12")</a></li>
            <li><a href="/products?category=trays">Meal & Bento Trays (3, 4, 5-CP)</a></li>
            <li><a href="/products?category=containers">Hinged Clamshell Boxes</a></li>
            <li><a href="/products?category=bowls">Soup & Curry Bowls</a></li>
            <li><a href="/products">All 27 Products Catalog</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company & Compliance</h4>
          <ul>
            <li><a href="/about">About Ecolates Factory</a></li>
            <li><a href="/certifications">Lab Test Certifications 📜</a></li>
            <li><a href="/#bulkEnquiry">Instant Wholesale RFQ</a></li>
            <li><a href="/#productChecks">6-Point Lab Quality Check</a></li>
            <li><a href="/#camStudio">360° Cam Inspection Studio</a></li>
            <li><a href="/products">Free Sample Kit Request</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Factory & Headquarters</h4>
          <address style={{ fontStyle: 'normal', lineHeight: '1.6', fontSize: '0.86rem' }}>
            <strong>Ecolates Eco Solutions Pvt. Ltd.</strong><br />
            Industrial Growth Centre, Phase-II,<br />
            Manufacturing Hub, India.<br />
            <strong>Helpline:</strong> +91 98765 43210<br />
            <strong>Email:</strong> sales@ecolates.com
          </address>
        </div>

      </div>

      <div className="container footer-bottom">
        <span>© 2026 Ecolates. All Rights Reserved. Manufactured with pride in India.</span>
        <div style={{ display: 'flex', gap: '18px' }}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Wholesale Supply</a>
          <a href="#">Export Documentation</a>
        </div>
      </div>
    </footer>
  );
}
