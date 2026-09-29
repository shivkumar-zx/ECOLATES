'use client';

import React, { useState, useEffect, createContext } from 'react';
import Header from './Header';
import FloatingDocks from './FloatingDocks';
import SampleModal from './SampleModal';
import CartModal from './CartModal';
import AuthModal from './AuthModal';
import Footer from './Footer';

export const SampleContext = createContext({
  samples: [],
  addSample: () => {},
  openModal: () => {}
});

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  openCart: () => {},
  closeCart: () => {},
  isCartOpen: false,
  cartCount: 0
});

export const AuthContext = createContext({
  user: null,
  signIn: () => {},
  signOut: () => {},
  openAuthModal: () => {}
});

export default function ClientLayoutShell({ children }) {
  const [samples, setSamples] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check saved session & saved cart
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('ecolates_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      const savedCart = localStorage.getItem('ecolates_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {}
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    try {
      localStorage.setItem('ecolates_cart', JSON.stringify(newCart));
    } catch (e) {}
  };

  const signIn = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('ecolates_user', JSON.stringify(userData));
    } catch (e) {}
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem('ecolates_user');
    } catch (e) {}
  };

  const addSample = (product) => {
    setSamples((prev) => {
      const exists = prev.some((p) => p.slug === product.slug || p.sku === product.sku);
      if (exists) return prev;
      return [...prev, product];
    });
    setIsModalOpen(true);
  };

  const clearSampleCart = () => {
    setSamples([]);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const idx = prev.findIndex(p => p.id === item.id || (p.sku && p.sku === item.sku));
      let next;
      if (idx >= 0) {
        next = [...prev];
        const existingVol = parseInt(next[idx].volume) || 0;
        const addVol = parseInt(item.volume) || 0;
        const newVol = existingVol + addVol;
        const rate = parseFloat(item.unitRate) || parseFloat(next[idx].unitRate) || 1;
        const pcsPerCtn = Math.round(existingVol / (parseInt(next[idx].cartons) || 1)) || 500;
        next[idx] = {
          ...next[idx],
          volume: newVol,
          cartons: Math.ceil(newVol / pcsPerCtn),
          total: (newVol * rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })
        };
      } else {
        next = [...prev, item];
      }
      try {
        localStorage.setItem('ecolates_cart', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    const next = cart.filter(p => p.id !== id);
    saveCart(next);
  };

  const updateCartQuantity = (id, newVolume) => {
    const next = cart.map(item => {
      if (item.id === id) {
        const rate = parseFloat(item.unitRate) || 1;
        const pcsPerCtn = Math.round((parseInt(item.volume) || 1) / (parseInt(item.cartons) || 1)) || 500;
        return {
          ...item,
          volume: newVolume,
          cartons: Math.ceil(newVolume / pcsPerCtn),
          total: (newVolume * rate).toLocaleString('en-IN', { maximumFractionDigits: 0 })
        };
      }
      return item;
    });
    saveCart(next);
  };

  const clearCart = () => {
    saveCart([]);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, openAuthModal: () => setIsAuthModalOpen(true) }}>
      <CartContext.Provider value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isCartOpen,
        cartCount: cart.length
      }}>
        <SampleContext.Provider value={{ samples, addSample, openModal: () => setIsModalOpen(true) }}>
          <Header 
            sampleCount={samples.length} 
            onOpenSampleModal={() => setIsModalOpen(true)}
            cartCount={cart.length}
            onOpenCartModal={() => setIsCartOpen(true)}
            user={user}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onSignOut={signOut}
          />

          <FloatingDocks 
            sampleCount={samples.length} 
            onOpenSampleModal={() => setIsModalOpen(true)} 
            cartCount={cart.length}
            onOpenCartModal={() => setIsCartOpen(true)}
          />

          <main>{children}</main>

          <SampleModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            selectedItems={samples}
            onClearCart={clearSampleCart}
            user={user}
          />

          <CartModal
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cart={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
            user={user}
          />

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onSignIn={signIn}
          />

          <Footer />
        </SampleContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
