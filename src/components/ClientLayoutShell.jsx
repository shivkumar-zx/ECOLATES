'use client';

import React, { useState, useEffect, createContext } from 'react';
import Header from './Header';
import FloatingDocks from './FloatingDocks';
import SampleModal from './SampleModal';
import AuthModal from './AuthModal';
import Footer from './Footer';

export const SampleContext = createContext({
  samples: [],
  addSample: () => {},
  openModal: () => {}
});

export const AuthContext = createContext({
  user: null,
  signIn: () => {},
  signOut: () => {},
  openAuthModal: () => {}
});

export default function ClientLayoutShell({ children }) {
  const [samples, setSamples] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Check saved session
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ecolates_user');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

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

  const clearCart = () => {
    setSamples([]);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, openAuthModal: () => setIsAuthModalOpen(true) }}>
      <SampleContext.Provider value={{ samples, addSample, openModal: () => setIsModalOpen(true) }}>
        <Header 
          sampleCount={samples.length} 
          onOpenSampleModal={() => setIsModalOpen(true)}
          user={user}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onSignOut={signOut}
        />

        <FloatingDocks 
          sampleCount={samples.length} 
          onOpenSampleModal={() => setIsModalOpen(true)} 
        />

        <main>{children}</main>

        <SampleModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          selectedItems={samples}
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
    </AuthContext.Provider>
  );
}
