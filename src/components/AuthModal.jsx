'use client';

import React, { useState } from 'react';

export default function AuthModal({ isOpen, onClose, onSignIn }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    gstin: '',
    password: ''
  });
  const [demoNotice, setDemoNotice] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      name: formData.name || (activeTab === 'login' ? (formData.email.split('@')[0] || 'Trade Buyer') : 'Commercial Buyer'),
      company: formData.company || 'Enterprise Food Service',
      email: formData.email,
      phone: formData.phone,
      gstin: formData.gstin || '27AABCU9603R1ZX'
    };
    onSignIn(userObj);
    onClose();
  };

  const handleQuickDemoLogin = (role) => {
    let demoUser = {
      name: 'Vikramaditya Singhania',
      company: 'Grand Marigold Hotels & Banquets',
      email: 'purchase@marigoldhotels.in',
      phone: '+91 99887 76655',
      gstin: '07AAACG8899K1Z1'
    };
    if (role === 'cloudKitchen') {
      demoUser = {
        name: 'Priya Mukherjee',
        company: 'Spice Route Cloud Kitchens',
        email: 'supply@spiceroutekitchens.com',
        phone: '+91 98223 34455',
        gstin: '29AABCS1234F1Z8'
      };
    }
    onSignIn(demoUser);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 100000 }}>
      <div 
        className="big-modal-dialog" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px', width: '92%', borderRadius: '24px', padding: '32px' }}
      >
        <button type="button" onClick={onClose} className="modal-close-btn" title="Close">
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#e8f7ee', border: '1.5px solid #b7e4c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', margin: '0 auto 12px' }}>
            🌱
          </div>
          <h2 style={{ fontSize: '1.7rem', color: '#1b4332', marginBottom: '6px' }}>
            B2B Wholesale Portal
          </h2>
          <p style={{ color: '#486153', fontSize: '0.88rem' }}>
            Direct factory accounts for restaurants, cloud kitchens & caterers.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: '#f0fbf4', borderRadius: '12px', padding: '4px', border: '1px solid #b7e4c7', marginBottom: '22px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '9px',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              background: activeTab === 'login' ? '#2d6a4f' : 'transparent',
              color: activeTab === 'login' ? '#ffffff' : '#2d6a4f',
              transition: 'all 0.2s'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('register')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '9px',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer',
              background: activeTab === 'register' ? '#2d6a4f' : 'transparent',
              color: activeTab === 'register' ? '#ffffff' : '#2d6a4f',
              transition: 'all 0.2s'
            }}
          >
            Register Trade Account
          </button>
        </div>

        {/* One-Click Fast Demo Logins */}
        <div style={{ background: '#f7faf8', border: '1px dashed #b7e4c7', borderRadius: '14px', padding: '14px', marginBottom: '20px' }}>
          <span style={{ fontSize: '0.74rem', color: '#7a9485', textTransform: 'uppercase', fontWeight: 800, display: 'block', marginBottom: '8px' }}>
            ⚡ 1-Click Instant Demo Login:
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('hotel')}
              style={{
                background: '#ffffff',
                border: '1px solid #ddecde',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '0.76rem',
                fontWeight: 700,
                color: '#1b4332',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              🏨 Grand Marigold Banquet
              <small style={{ display: 'block', color: '#15803d', fontSize: '0.68rem' }}>Verified Wholesale Buyer</small>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('cloudKitchen')}
              style={{
                background: '#ffffff',
                border: '1px solid #ddecde',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '0.76rem',
                fontWeight: 700,
                color: '#1b4332',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              🛵 Spice Route Cloud Kitchen
              <small style={{ display: 'block', color: '#15803d', fontSize: '0.68rem' }}>Tier 1 FCL Buyer</small>
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {activeTab === 'register' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1b4332', marginBottom: '4px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Mehta"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1b4332', marginBottom: '4px' }}>
                  Kitchen / Brand Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Urban Tandoor Cloud Kitchens"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1b4332', marginBottom: '4px' }}>
                  GSTIN / Business Tax ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="27AABCU9603R1ZX"
                  value={formData.gstin}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.88rem' }}
                />
              </div>
            </>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1b4332', marginBottom: '4px' }}>
              Work Email / Phone *
            </label>
            <input
              type="text"
              required
              placeholder="buyer@restaurant.com or +91..."
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.88rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1b4332', marginBottom: '4px' }}>
              Password *
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.88rem' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary-green btn-lg btn-block"
            style={{ marginTop: '8px' }}
          >
            {activeTab === 'login' ? 'Sign In to Trade Account' : 'Complete Trade Registration'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.76rem', color: '#7a9485' }}>
          🔒 Protected with 256-Bit SSL Encryption • Instant GST Invoicing
        </div>
      </div>
    </div>
  );
}
