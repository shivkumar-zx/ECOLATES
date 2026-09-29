'use client';

import React, { useState } from 'react';

export default function CartModal({
  isOpen,
  onClose,
  cart = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  user
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    company: user?.company || '',
    city: user?.city || '',
    notes: ''
  });

  if (!isOpen) return null;

  const totalPieces = cart.reduce((acc, item) => acc + (parseInt(item.volume) || 0), 0);
  const totalCartons = cart.reduce((acc, item) => acc + (parseInt(item.cartons) || 0), 0);
  const totalAmount = cart.reduce((acc, item) => {
    const num = parseFloat(String(item.total).replace(/[^0-9.]/g, '')) || 0;
    return acc + num;
  }, 0);

  const handleSubmitCartRfq = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Commercial Cart Bulk RFQ',
          customerName: formData.name,
          phone: formData.phone,
          company: formData.company,
          city: formData.city,
          notes: formData.notes,
          totalPieces,
          totalCartons,
          estimatedTotal: `₹${totalAmount.toLocaleString('en-IN')}`,
          items: cart.map(item => ({
            title: item.title,
            sku: item.sku,
            unitRate: item.unitRate,
            volume: item.volume,
            cartons: item.cartons,
            total: item.total
          }))
        })
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppCart = () => {
    const itemsList = cart
      .map((it, idx) => `${idx + 1}) ${it.title} (${it.sku}): ${Number(it.volume).toLocaleString()} pcs @ ₹${it.unitRate}/pc = ₹${it.total}`)
      .join('%0A');
    const msg = `Hi Ecolates, I want to order the following from my commercial cart:%0A%0A${itemsList}%0A%0ATotal Volume: ${totalPieces.toLocaleString()} pcs (${totalCartons} Cartons)%0AEstimated Total: ₹${totalAmount.toLocaleString('en-IN')}%0A%0APlease share proforma invoice with freight estimate.`;
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(10, 30, 20, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
          border: '1.5px solid #ddecde',
          overflow: 'hidden',
          animation: 'fadeInUp 0.25s ease-out'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid #eef3ef',
          background: 'linear-gradient(180deg, #f7faf8 0%, #ffffff 100%)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.25rem' }}>🛒</span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1b4332', margin: 0 }}>
                Commercial B2B Cart
              </h2>
              <span style={{
                background: '#dcfce7',
                color: '#15803d',
                fontSize: '0.74rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '999px',
                border: '1px solid #b7e4c7'
              }}>
                {cart.length} {cart.length === 1 ? 'Item' : 'Items'}
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#52796f', margin: '4px 0 0' }}>
              Consolidated manufacturer order desk with direct factory tiered rates.
            </p>
          </div>

          <button 
            type="button" 
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#f0f4f1',
              border: 'none',
              color: '#1b4332',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            title="Close Cart"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🛒</div>
              <h3 style={{ fontSize: '1.2rem', color: '#1b4332', marginBottom: '8px', fontWeight: 800 }}>
                Your Commercial Cart is Empty
              </h3>
              <p style={{ color: '#52796f', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 24px', lineHeight: '1.5' }}>
                Add tableware items from any product page with your required wholesale volume tier.
              </p>
              <a 
                href="/products" 
                onClick={onClose} 
                className="btn btn-primary-green"
                style={{ padding: '10px 22px', fontSize: '0.88rem', fontWeight: 700 }}
              >
                Browse Commercial Products
              </a>
            </div>
          ) : submitted ? (
            <div style={{ background: '#dcfce7', border: '1.5px solid #86efac', padding: '28px', borderRadius: '18px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>✓</div>
              <h3 style={{ fontSize: '1.3rem', color: '#15803d', fontWeight: 800, margin: '0 0 8px' }}>
                Cart Proforma RFQ Dispatched!
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#166534', maxWidth: '480px', margin: '0 auto 20px', lineHeight: '1.5' }}>
                Thank you, {formData.name || 'valued buyer'}! Our commercial trade desk has received your consolidated request for {totalPieces.toLocaleString()} pieces. An official GST proforma quotation with freight estimate is being prepared.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => {
                    onClearCart();
                    setSubmitted(false);
                    onClose();
                  }}
                  className="btn btn-primary-green"
                  style={{ padding: '9px 18px', fontSize: '0.85rem' }}
                >
                  Clear Cart & Continue
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Item Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {cart.map((item, idx) => (
                  <div 
                    key={item.id || idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      background: '#f9fbf9',
                      border: '1px solid #ddecde',
                      borderRadius: '16px',
                      padding: '14px 18px',
                      position: 'relative'
                    }}
                  >
                    {item.featuredImage && (
                      <img 
                        src={item.featuredImage} 
                        alt={item.title} 
                        style={{
                          width: '64px',
                          height: '64px',
                          objectFit: 'contain',
                          background: '#ffffff',
                          borderRadius: '12px',
                          border: '1px solid #e5ebe7',
                          padding: '4px',
                          flexShrink: 0
                        }}
                      />
                    )}

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.72rem', color: '#52796f', fontWeight: 600 }}>SKU: {item.sku}</span>
                        <span style={{ fontSize: '0.72rem', color: '#15803d', background: '#dcfce7', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          ₹{item.unitRate}/pc
                        </span>
                      </div>
                      <h4 style={{ fontSize: '0.94rem', color: '#1b4332', margin: '3px 0 6px', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.title}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.78rem', color: '#52796f' }}>
                        <span>Volume: <strong style={{ color: '#1b4332' }}>{Number(item.volume).toLocaleString()} pcs</strong></span>
                        <span>•</span>
                        <span>{item.cartons} Cartons</span>
                      </div>
                    </div>

                    {/* Quantity Stepper & Price */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2d6a4f' }}>
                        ₹{item.total}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1000, (parseInt(item.volume) || 1000) - 2500))}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            border: '1px solid #b7e4c7',
                            background: '#ffffff',
                            color: '#1b4332',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}
                          title="Reduce Volume"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, (parseInt(item.volume) || 1000) + 2500)}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            border: '1px solid #2d6a4f',
                            background: '#2d6a4f',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}
                          title="Increase Volume"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#dc2626',
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            padding: '4px',
                            marginLeft: '4px'
                          }}
                          title="Remove item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Metrics Strip */}
              <div style={{
                background: '#f0fbf4',
                border: '1.5px solid #b7e4c7',
                borderRadius: '16px',
                padding: '16px 20px',
                marginBottom: '24px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                textAlign: 'center'
              }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#52796f', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Total Tableware</span>
                  <strong style={{ fontSize: '1.15rem', color: '#1b4332' }}>{totalPieces.toLocaleString()} pcs</strong>
                </div>
                <div style={{ borderLeft: '1px solid #ddecde', borderRight: '1px solid #ddecde' }}>
                  <span style={{ fontSize: '0.72rem', color: '#52796f', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Master Cases</span>
                  <strong style={{ fontSize: '1.15rem', color: '#1b4332' }}>{totalCartons} Cartons</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#52796f', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Estimated Subtotal</span>
                  <strong style={{ fontSize: '1.25rem', color: '#2d6a4f' }}>₹{totalAmount.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              {/* RFQ Form for Entire Cart */}
              <div style={{ background: '#f7faf8', border: '1px solid #ddecde', borderRadius: '18px', padding: '20px' }}>
                <h4 style={{ fontSize: '0.96rem', color: '#1b4332', fontWeight: 800, margin: '0 0 6px' }}>
                  ⚡ Request Consolidated Factory Proforma RFQ
                </h4>
                <p style={{ fontSize: '0.78rem', color: '#52796f', margin: '0 0 14px' }}>
                  Official tax invoice with volume pallet freight and GST will be dispatched to your WhatsApp.
                </p>

                <form onSubmit={handleSubmitCartRfq} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input 
                      type="text" 
                      required
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.84rem' }}
                    />
                    <input 
                      type="tel" 
                      required
                      placeholder="WhatsApp Phone Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.84rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input 
                      type="text" 
                      placeholder="Company / Restaurant / Chain Name"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.84rem' }}
                    />
                    <input 
                      type="text" 
                      placeholder="Delivery City / Pin Code"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #b7e4c7', fontSize: '0.84rem' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '6px', flexWrap: 'wrap' }}>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn btn-primary-green"
                      style={{ flex: 1, justifyContent: 'center', padding: '11px 18px', fontSize: '0.86rem', fontWeight: 800 }}
                    >
                      {isSubmitting ? 'Dispatching...' : `Send Cart RFQ (₹${totalAmount.toLocaleString('en-IN')})`}
                    </button>

                    <button 
                      type="button"
                      onClick={handleWhatsAppCart}
                      className="btn btn-light-green-outline"
                      style={{ padding: '11px 16px', fontSize: '0.86rem', fontWeight: 800, background: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <span>💬</span>
                      <span>WhatsApp Order</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 24px',
          borderTop: '1px solid #eef3ef',
          background: '#f9fbf9',
          fontSize: '0.78rem',
          color: '#52796f'
        }}>
          <div>
            <span>*18% GST and Doorstep LTL freight computed upon dispatch.</span>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {cart.length > 0 && !submitted && (
              <button 
                type="button" 
                onClick={onClearCart} 
                style={{ background: 'transparent', border: 'none', color: '#dc2626', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}
              >
                Clear Cart
              </button>
            )}
            <button 
              type="button" 
              onClick={onClose}
              className="btn btn-light-green-outline"
              style={{ padding: '6px 14px', fontSize: '0.78rem', background: '#ffffff' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
